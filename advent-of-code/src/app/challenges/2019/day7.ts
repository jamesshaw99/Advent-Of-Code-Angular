import { Amplifier } from "../../helpers/amplifier";
import { day } from "../../helpers/day";
import { ExitReason } from "../../helpers/enums";

export class year2019day7 extends day {
  private text = '';
  private phases: number[] = [];
  private listOfPossiblePhases: number[][] = [];

  override preChallenge(): void {
      this.text = this.input[0];
  }

  override part1(): string | Promise<string> {
      this.phases = [0,1,2,3,4];
      this.listOfPossiblePhases = this.createAllPermutations(this.phases);
      return `Highest signal from thrusters: ${Math.max(...this.runPermutations(false))}`
  }

//   override part2(): string | Promise<string> {
//       this.phases = [9,7,8,5,6];
//       this.listOfPossiblePhases = this.createAllPermutations(this.phases);
//       return `Highest signal from thrusters: ${Math.max(...this.runPermutations(true))}`
//   }

  runPermutations(feedbackMode: boolean): number[] {
    const thrustOutputsPossible: number[] = [];

    for (const phaseSet of this.listOfPossiblePhases) {
      const amplifiers = this.createAmplifiersForPhaseSet(phaseSet);

      let ampIndex = 0;
      let ampsRan = 0;

      try {
        do {
          const amp = amplifiers[ampIndex];
          amp.runUntilBlockedOrExited();

          ampIndex = (ampIndex + 1) % amplifiers.length;
          const nextAmp = amplifiers[ampIndex];

          nextAmp.addInputs(amp.getAvailableOutputs());
          ampsRan++;
        } while (
          this.shouldRunNextAmplifier(
            amplifiers[ampIndex].lastExitReason,
            feedbackMode,
            ampsRan,
            phaseSet.length
          )
        );
      } catch (e) {
        if ((e as Error).message !== 'BLOCKED') throw e;
      }

      thrustOutputsPossible.push(...amplifiers[amplifiers.length - 1].totalOutputs);
    }
    return thrustOutputsPossible;
  }

  createAllPermutations<T>(list: T[]): T[][] {
    if (list.length === 1) {
      return [list];
    }

    const [element, ...rest] = list;
    const permutations: T[][] = [];

    for (const perm of this.createAllPermutations(rest)) {
      for (let i = 0; i <= perm.length; i++) {
        const tempArray = [...perm.slice(0, i), element, ...perm.slice(i)];
        permutations.push(tempArray);
      }
    }

    return permutations;
  }

  createAmplifiersForPhaseSet(phaseSet: number[]): Amplifier[] {
    return phaseSet.map((phase, index) => {
      const amp = new Amplifier(this.text);
      amp.addInput(phase);
      if (index === 0) {
        amp.addInput(0);
      }
      return amp;
    });
  }

  shouldRunNextAmplifier(
    exitReason: ExitReason,
    feedbackMode: boolean,
    ampsRan: number,
    numPhases: number
  ): boolean {
    const isBlocked = exitReason === ExitReason.NEED_INPUT;
    const isExited = exitReason === ExitReason.EXITED;

    if (!feedbackMode) {
      return isBlocked && ampsRan < numPhases;
    }

    return isBlocked && !isExited;
  }
}