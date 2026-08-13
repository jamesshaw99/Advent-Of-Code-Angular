import { day } from '../../helpers/day';

interface Machine {
  targetLights: boolean[];
  buttons: number[][];
  joltageTargets: number[];
}

export class year2025day10 extends day {
  machines: Machine[] = [];

  override preChallenge(): void {
    for (const line of this.input) {
      const lightsMatch = line.match(/\[([.#]+)\]/);
      if (!lightsMatch) throw new Error('Invalid lights pattern');

      const targetLights = lightsMatch[1].split('').map((x) => x === '#');

      const buttonMatches = line.matchAll(/\(([0-9,]+)\)/g);
      const buttons: number[][] = [];

      for (const match of buttonMatches) {
        const indices = match[1].split(',').map(Number);
        buttons.push(indices);
      }

      const joltageMatch = line.match(/\{([0-9,]+)\}/);
      const joltageTargets = joltageMatch
        ? joltageMatch[1].split(',').map(Number)
        : [];

      this.machines.push({ targetLights, buttons, joltageTargets });
    }
  }

  override part1(): string {
    let totalPresses = 0;

    for (const machine of this.machines) {
      const minPresses = this.solveIndicatorLights(machine);

      totalPresses += minPresses;
    }

    return `Fewest button presses to configure all machines: ${totalPresses}`;
  }

  override part2(): string {
    let totalPresses = 0;

    for (const machine of this.machines) {
      const minPresses = this.solveJoltageRequirements(machine);
      totalPresses += minPresses;
    }

    return `Fewest button presses to configure all Joltage requirements: ${totalPresses}`;
  }

  solveIndicatorLights(machine: Machine): number {
    const numLights = machine.targetLights.length;
    const numButtons = machine.buttons.length;

    let minPresses = Infinity;

    for (let mask = 0; mask < 1 << numButtons; mask++) {
      const lights = new Array(numLights).fill(false);
      let pressCount = 0;

      for (let buttonIdx = 0; buttonIdx < numButtons; buttonIdx++) {
        if (mask & (1 << buttonIdx)) {
          pressCount++;
          for (const lightIdx of machine.buttons[buttonIdx]) {
            lights[lightIdx] = !lights[lightIdx];
          }
        }
      }

      const matches = lights.every(
        (state, idx) => state === machine.targetLights[idx]
      );

      if (matches) {
        minPresses = Math.min(minPresses, pressCount);
      }
    }

    return minPresses === Infinity ? -1 : minPresses;
  }

  solveJoltageRequirements(machine: Machine): number {
    const numCounters = machine.joltageTargets.length;
    const numButtons = machine.buttons.length;

    const matrix: number[][] = [];
    for (let i = 0; i < numCounters; i++) {
      matrix[i] = new Array(numButtons).fill(0);
      for (let j = 0; j < numButtons; j++) {
        if (machine.buttons[j].includes(i)) {
          matrix[i][j] = 1;
        }
      }
    }

    const targets = machine.joltageTargets;
    const result = this.solveOptimal(matrix, targets);

    if (result === null) {
      return -1;
    }

    return result.reduce((sum, val) => sum + val, 0);
  }

  solveOptimal(A: number[][], b: number[]): number[] | null {
    const m = A.length;
    const n = A[0].length;

    const aug: number[][] = A.map((row, i) => [...row, b[i]]);
    const pivotCols: number[] = [];
    const pivotRows: number[] = [];

    for (let col = 0, row = 0; col < n && row < m; col++) {
      let maxRow = row;
      for (let k = row + 1; k < m; k++) {
        if (Math.abs(aug[k][col]) > Math.abs(aug[maxRow][col])) {
          maxRow = k;
        }
      }

      if (Math.abs(aug[maxRow][col]) < 1e-10) {
        continue;
      }

      [aug[row], aug[maxRow]] = [aug[maxRow], aug[row]];
      pivotCols.push(col);
      pivotRows.push(row);

      const pivot = aug[row][col];
      for (let j = 0; j <= n; j++) {
        aug[row][j] /= pivot;
      }

      for (let k = 0; k < m; k++) {
        if (k !== row && Math.abs(aug[k][col]) > 1e-10) {
          const factor = aug[k][col];
          for (let j = 0; j <= n; j++) {
            aug[k][j] -= factor * aug[row][j];
          }
        }
      }

      row++;
    }

    const freeVars: number[] = [];
    for (let col = 0; col < n; col++) {
      if (!pivotCols.includes(col)) {
        freeVars.push(col);
      }
    }

    if (freeVars.length === 0) {
      const x = new Array(n).fill(0);
      for (let i = 0; i < pivotCols.length; i++) {
        const col = pivotCols[i];
        const row = pivotRows[i];
        x[col] = Math.round(aug[row][n]);
      }

      if (this.verifySolution(A, b, x)) {
        return x;
      }
    }

    return this.searchFreevariables(
      aug,
      pivotCols,
      pivotRows,
      freeVars,
      n,
      A,
      b
    );
  }

  searchFreevariables(
  aug: number[][],
  pivotCols: number[],
  pivotRows: number[],
  freeVars: number[],
  n: number,
  A: number[][],
  b: number[]
): number[] | null {
  let bestSolution: number[] | null = null;
  let bestSum = Infinity;
  
  const numFree = freeVars.length;
  const searchBound = Math.max(...b) * 2;
  
  const search = (freeIdx: number, freeValues: number[], currentSum: number) => {
    if (currentSum >= bestSum) return;
    
    if (freeIdx === numFree) {
      const x = new Array(n).fill(0);
      
      for (let i = 0; i < numFree; i++) {
        x[freeVars[i]] = freeValues[i];
      }
      
      for (let i = 0; i < pivotCols.length; i++) {
        const col = pivotCols[i];
        const row = pivotRows[i];
        
        let val = aug[row][n]; // RHS
        for (let j = 0; j < n; j++) {
          if (j !== col) {
            val -= aug[row][j] * x[j];
          }
        }
        
        x[col] = Math.round(val);
      }
      
      if (x.every(v => v >= 0) && this.verifySolution(A, b, x)) {
        const sum = x.reduce((s, v) => s + v, 0);
        if (sum < bestSum) {
          bestSum = sum;
          bestSolution = [...x];
        }
      }
      
      return;
    }
    
    for (let val = 0; val <= searchBound && currentSum + val < bestSum; val++) {
      freeValues[freeIdx] = val;
      search(freeIdx + 1, freeValues, currentSum + val);
    }
  };
  
  search(0, [], 0);
  
  return bestSolution;
}

  verifySolution(A: number[][], b: number[], x: number[]): boolean {
    for (let i = 0; i < A.length; i++) {
      let sum = 0;
      for (let j = 0; j < A[i].length; j++) {
        sum += A[i][j] * x[j];
      }
      if (Math.abs(sum - b[i]) > 0.5) {
        return false;
      }
    }
    return true;
  }

  findHeuristicSolution(
    A: number[][],
    b: number[],
    n: number
  ): number[] | null {
    const m = A.length;
    const x = new Array(n).fill(0);
    const current = new Array(m).fill(0);

    const maxTotal = b.reduce((sum, val) => sum + val, 0) * 2;
    let totalPresses = 0;

    while (totalPresses < maxTotal) {
      if (current.every((val, i) => val === b[i])) {
        return x;
      }

      let bestButton = -1;
      let bestScore = -Infinity;

      for (let j = 0; j < n; j++) {
        let score = 0;
        let wouldOvershoot = false;

        for (let i = 0; i < m; i++) {
          if (A[i][j] === 1) {
            const deficit = b[i] - current[i];
            if (deficit > 0) {
              score += deficit;
            } else if (deficit === 0) {
              wouldOvershoot = true;
              break;
            }
          }
        }

        if (!wouldOvershoot && score > bestScore) {
          bestScore = score;
          bestButton = j;
        }
      }

      if (bestButton === -1) {
        return null;
      }

      x[bestButton]++;
      totalPresses++;

      for (let i = 0; i < m; i++) {
        if (A[i][bestButton] === 1) {
          current[i]++;
        }
      }
    }

    return null;
  }
}
