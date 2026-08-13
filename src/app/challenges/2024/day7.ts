import { day } from '../../helpers/day';

export class year2024day7 extends day {
  override part1(): string {
    let totalCalibrationResult = 0;

    for (const line of this.input) {
      const [testValueStr, numbersStr] = line.split(':');
      const testValue = parseInt(testValueStr.trim(), 10);
      const numbers = numbersStr.trim().split(' ').map(Number);

      const operatorCombinations = this.generateOperators(
        numbers.length - 1
      ).filter((comb) => !comb.includes('||'));

      for (const operators of operatorCombinations) {
        if (this.evaluateExpression(numbers, operators) === testValue) {
          totalCalibrationResult += testValue;
          break;
        }
      }
    }
    return `Total Calibration Result: ${totalCalibrationResult}`;
  }

  override part2(): string {
    let totalCalibrationResult = 0;

    for (const line of this.input) {
      const [testValueStr, numbersStr] = line.split(':');
      const testValue = parseInt(testValueStr.trim(), 10);
      const numbers = numbersStr.trim().split(' ').map(Number);

      const operatorCombinations = this.generateOperators(numbers.length - 1);

      for (const operators of operatorCombinations) {
        if (this.evaluateExpression(numbers, operators) === testValue) {
          totalCalibrationResult += testValue;
          break;
        }
      }
    }
    return `Total Calibration Result: ${totalCalibrationResult}`;
  }

  evaluateExpression(numbers: number[], operators: string[]): number {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === '+') {
        result += numbers[i + 1];
      } else if (operators[i] === '*') {
        result *= numbers[i + 1];
      } else if (operators[i] === '||') {
        result = parseInt(`${result}${numbers[i + 1]}`, 10);
      }
    }
    return result;
  }

  generateOperators(
    length: number,
    current: string[] = [],
    results: string[][] = []
  ): string[][] {
    if (current.length === length) {
      results.push([...current]);
      return results;
    }

    current.push('+');
    this.generateOperators(length, current, results);
    current.pop();

    current.push('*');
    this.generateOperators(length, current, results);
    current.pop();

    current.push('||');
    this.generateOperators(length, current, results);
    current.pop();

    return results;
  }
}
