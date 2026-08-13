import { day } from '../../helpers/day';

export class year2024day9 extends day {
  private diskMap!: string;

  override preChallenge(): void {
    this.diskMap = this.input[0];
  }

  override part1(): string {
    const { blocks } = this.parseDiskMap();
    const compactedBlocks = this.compactDiskPart1(blocks);
    return `filesystem checksum: ${this.calculateChecksum(compactedBlocks)}`;
  }

  override part2(): string {
    const { blocks, fileSizes } = this.parseDiskMap();
    const compactedBlocks = this.compactDiskPart2(blocks, fileSizes);
    return `filesystem checksum: ${this.calculateChecksum(compactedBlocks)}`;
  }

  parseDiskMap(): { blocks: (number | null)[], fileSizes: Map<number, number> } {
    const blocks: (number | null)[] = [];
    const fileSizes = new Map<number, number>();
    let fileId = 0;

    for (let i = 0; i < this.diskMap.length; i += 2) {
      const fileSize = parseInt(this.diskMap[i], 10);
      const freeSpaceSize = parseInt(this.diskMap[i + 1], 10);

      fileSizes.set(fileId, fileSize);
      blocks.push(...Array(fileSize).fill(fileId));
      if (freeSpaceSize > 0) {
        blocks.push(...Array(freeSpaceSize).fill(null));
      }
      fileId++;
    }
    return { blocks, fileSizes };
  }

  compactDiskPart1(blocks: (number | null)[]): (number | null)[] {
    for (let readPointer = blocks.length-1; readPointer >= 0; readPointer--) {
      if (blocks[readPointer] !== null) {
        const firstNullIndex = blocks.findIndex((block) => block === null);
        if (firstNullIndex < readPointer) {
          blocks[firstNullIndex] = blocks[readPointer];
          blocks[readPointer] = null;
        }
      }
    }
    return blocks;
  }

  compactDiskPart2(blocks: (number | null)[], fileSizes: Map<number, number>): (number | null)[] {
    const fileIDs = Array.from(fileSizes.keys()).sort((a, b) => b - a); // Sort by descending file ID

    for (const fileID of fileIDs) {
      const fileSize = fileSizes.get(fileID)!;
      const currentIndex = blocks.indexOf(fileID);

      if (currentIndex === -1) continue; // Skip if file is already moved

      const freeSpaceStart = this.findFreeSpace(blocks, fileSize);

      if (freeSpaceStart !== null && freeSpaceStart < currentIndex) {
        // Move the file
        for (let i = 0; i < fileSize; i++) {
          blocks[freeSpaceStart + i] = fileID;
          blocks[currentIndex + i] = null;
        }
      }
    }

    return blocks;
  }

  findFreeSpace(blocks: (number | null)[], fileSize: number): number | null {
    let freeSpanSize = 0;
    let freeSpanStart = -1;

    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i] === null) {
        freeSpanSize++;
        if (freeSpanStart === -1) {
          freeSpanStart = i;
        }
      } else {
        freeSpanSize = 0;
        freeSpanStart = -1;
      }

      if (freeSpanSize === fileSize) {
        return freeSpanStart; // Found a span large enough
      }
    }

    return null; // No suitable span found
  }

  calculateChecksum(blocks: (number | null)[]): number {
    return blocks.reduce(
      (checksum: number, fileID, position) =>
        checksum + (fileID !== null ? position * fileID : 0),
      0
    );
  }
}
