import { day } from '../../helpers/day';
import { ProgramExecutor } from '../../helpers/intcode/program-executor';

const OPPOSITE: Record<string, string> = { north: 'south', south: 'north', east: 'west', west: 'east' };
const MAX_RESTARTS = 30;
const TURN_INSTRUCTION_BUDGET = 2_000_000;

interface RoomResponse {
  isRoom: true;
  name: string;
  doors: string[];
  items: string[];
}

interface CheckpointAttemptResponse {
  isRoom: false;
  isCheckpointAttempt: true;
  success: boolean;
  securityCode: number | null;
}

interface UnrecognisedResponse {
  isRoom: false;
  isCheckpointAttempt: false;
}

type ParsedResponse = RoomResponse | CheckpointAttemptResponse | UnrecognisedResponse;

type ExploreResult =
  | { status: 'dangerous-item'; item: string }
  | { status: 'no-checkpoint' }
  | { status: 'success'; computer: ProgramExecutor; inventory: string[]; sensorDirection: string };

export class year2019day25 extends day {
  private text = '';

  override preChallenge(): void {
    this.text = this.input[0];
  }

  override async part1(): Promise<string> {
    const knownDangerous = new Set<string>();

    for (let attempt = 0; attempt < MAX_RESTARTS; attempt++) {
      const result = await this.explore(knownDangerous);

      if (result.status === 'dangerous-item') {
        knownDangerous.add(result.item);
        continue;
      }
      if (result.status === 'no-checkpoint') {
        return 'Could not reach the Pressure-Sensitive Floor';
      }
      return `${await this.findSecurityCode(result.computer, result.inventory, result.sensorDirection)}`;
    }

    return 'Could not safely map the ship after repeated resets';
  }

  override part2(): string | Promise<string> {
    return 'Free star'
  }

  private async explore(knownDangerous: Set<string>): Promise<ExploreResult> {
    const computer = new ProgramExecutor(this.text);
    computer.getIo().enableBlockOnEmptyInput(true);

    let response = this.parseResponse(await this.readUntilPrompt(computer));
    const inventory = new Set<string>();
    const roomDoorsTried = new Map<string, Set<string>>();
    const pathStack: string[] = [];
    let checkpointPath: string[] | null = null;
    let sensorDirection: string | null = null;
    let lastTakenItem: string | null = null;

    while (response.isRoom) {
      const room = response;

      for (const item of room.items) {
        if (knownDangerous.has(item) || inventory.has(item)) {
          continue;
        }
        await this.sendCommand(computer, `take ${item}`);
        const takeResponse = await this.readUntilPrompt(computer);
        if (!takeResponse.endsWith('Command?\n')) {
          return { status: 'dangerous-item', item };
        }
        inventory.add(item);
        lastTakenItem = item;
      }

      const tried = roomDoorsTried.get(room.name) ?? new Set<string>();
      roomDoorsTried.set(room.name, tried);
      const nextDirection = room.doors.find(d => !tried.has(d));

      if (nextDirection) {
        tried.add(nextDirection);
        await this.sendCommand(computer, nextDirection);
        const attempt = this.parseResponse(await this.readUntilPrompt(computer));

        if (attempt.isRoom) {
          pathStack.push(nextDirection);
          response = attempt;
        } else if (attempt.isCheckpointAttempt) {
          checkpointPath = [...pathStack];
          sensorDirection = nextDirection;
        } else if (lastTakenItem) {
          return { status: 'dangerous-item', item: lastTakenItem };
        }
      } else if (pathStack.length > 0) {
        const lastDirection = pathStack.pop()!;
        await this.sendCommand(computer, OPPOSITE[lastDirection]);
        const back = this.parseResponse(await this.readUntilPrompt(computer));
        if (back.isRoom) {
          response = back;
        } else if (lastTakenItem) {
          return { status: 'dangerous-item', item: lastTakenItem };
        }
      } else {
        break;
      }
    }

    if (!checkpointPath || !sensorDirection) {
      return { status: 'no-checkpoint' };
    }

    await this.navigateTo(computer, pathStack, checkpointPath);
    return { status: 'success', computer, inventory: [...inventory], sensorDirection };
  }

  private async navigateTo(computer: ProgramExecutor, from: string[], to: string[]): Promise<void> {
    let commonPrefix = 0;
    while (commonPrefix < from.length && commonPrefix < to.length && from[commonPrefix] === to[commonPrefix]) {
      commonPrefix++;
    }
    for (let i = from.length - 1; i >= commonPrefix; i--) {
      await this.sendCommand(computer, OPPOSITE[from[i]]);
      this.parseResponse(await this.readUntilPrompt(computer));
    }
    for (let i = commonPrefix; i < to.length; i++) {
      await this.sendCommand(computer, to[i]);
      this.parseResponse(await this.readUntilPrompt(computer));
    }
  }

  private async findSecurityCode(computer: ProgramExecutor, items: string[], sensorDirection: string): Promise<number> {
    let currentlyCarried = new Set(items);

    for (let subset = 0; subset < 1 << items.length; subset++) {
      const wanted = new Set(items.filter((_, index) => (subset & (1 << index)) !== 0));

      for (const item of currentlyCarried) {
        if (!wanted.has(item)) {
          await this.sendCommand(computer, `drop ${item}`);
          this.parseResponse(await this.readUntilPrompt(computer));
        }
      }
      for (const item of wanted) {
        if (!currentlyCarried.has(item)) {
          await this.sendCommand(computer, `take ${item}`);
          this.parseResponse(await this.readUntilPrompt(computer));
        }
      }
      currentlyCarried = wanted;

      await this.sendCommand(computer, sensorDirection);
      const attempt = this.parseResponse(await this.readUntilPrompt(computer));
      if (!attempt.isRoom && attempt.isCheckpointAttempt && attempt.success && attempt.securityCode !== null) {
        return attempt.securityCode;
      }
    }

    throw new Error('No item combination satisfied the pressure-sensitive floor');
  }

  private async sendCommand(computer: ProgramExecutor, command: string): Promise<void> {
    for (const character of `${command}\n`) {
      computer.getIo().addInput(character.charCodeAt(0));
    }
  }

  private async readUntilPrompt(computer: ProgramExecutor): Promise<string> {
    const startIndex = computer.getIo().getOutputsLogLength();
    await computer.run(TURN_INSTRUCTION_BUDGET);
    return computer.getIo().getOutputsLogSince(startIndex).map(code => String.fromCharCode(code)).join('');
  }

  private parseResponse(text: string): ParsedResponse {
    if (text.includes('Alert!')) {
      return { isRoom: false, isCheckpointAttempt: true, success: false, securityCode: null };
    }
    if (text.includes('You should be able to get in by typing')) {
      const codeMatch = text.match(/typing (\d+)/);
      return { isRoom: false, isCheckpointAttempt: true, success: true, securityCode: codeMatch ? Number(codeMatch[1]) : null };
    }

    const nameMatch = text.match(/== (.+) ==/);
    if (!nameMatch) {
      return { isRoom: false, isCheckpointAttempt: false };
    }

    const doors: string[] = [];
    const doorsMatch = text.match(/Doors here lead:\n([\s\S]*?)\n\n/);
    if (doorsMatch) {
      for (const line of doorsMatch[1].split('\n')) {
        if (line.startsWith('- ')) {
          doors.push(line.substring(2));
        }
      }
    }

    const items: string[] = [];
    const itemsMatch = text.match(/Items here:\n([\s\S]*?)\n\n/);
    if (itemsMatch) {
      for (const line of itemsMatch[1].split('\n')) {
        if (line.startsWith('- ')) {
          items.push(line.substring(2));
        }
      }
    }

    return { isRoom: true, name: nameMatch[1], doors, items };
  }
}
