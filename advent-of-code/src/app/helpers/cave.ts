export abstract class Cave {
  readonly value: string;
  readonly links = new Set<Cave>();
  abstract readonly isSmall: boolean;

  constructor(value: string) {
    this.value = value;
  }

  addCave(cave: Cave): void {
    this.links.add(cave);
  }
}

export class BigCave extends Cave {
  readonly isSmall = false;
}

export class SmallCave extends Cave {
  readonly isSmall = true;
}