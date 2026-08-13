import { day } from "../../helpers/day";
import { Point } from "../../models/point";

interface Instruction {
  action: string;
  value: number;
}

export class year2020day12 extends day {
private instructions: Instruction[] = [];

  override preChallenge(): void {
    this.instructions = this.input
      .map(line => ({
        action: line[0],
        value: parseInt(line.slice(1))
      }));
  }

  override part1(): string {
    const ship: Point = { x: 0, y: 0 };
    let direction = 90;

    const directions: Record<number, Point> = {
      0: { x: 0, y: 1 },
      90: { x: 1, y: 0 },
      180: { x: 0, y: -1 },
      270: { x: -1, y: 0 }
    };

    for (const { action, value } of this.instructions) {
      switch (action) {
        case 'N':
          ship.y += value;
          break;
        case 'S':
          ship.y -= value;
          break;
        case 'E':
          ship.x += value;
          break;
        case 'W':
          ship.x -= value;
          break;
        case 'L':
          direction = this.normalizeAngle(direction - value);
          break;
        case 'R':
          direction = this.normalizeAngle(direction + value);
          break;
        case 'F': {
          const dir = directions[direction];
          ship.x += dir.x * value;
          ship.y += dir.y * value;
          break;
        }
      }
    }

    return `Manhattan distance: ${Math.abs(ship.x) + Math.abs(ship.y)}`;
  }

  override part2(): string {
    const ship: Point = { x: 0, y: 0 };
    const waypoint: Point = { x: 10, y: 1 };

    for (const { action, value } of this.instructions) {
      switch (action) {
        case 'N':
          waypoint.y += value;
          break;
        case 'S':
          waypoint.y -= value;
          break;
        case 'E':
          waypoint.x += value;
          break;
        case 'W':
          waypoint.x -= value;
          break;
        case 'L':
          this.rotateWaypoint(waypoint, -value);
          break;
        case 'R':
          this.rotateWaypoint(waypoint, value);
          break;
        case 'F':
          ship.x += waypoint.x * value;
          ship.y += waypoint.y * value;
          break;
      }
    }

    return `Manhattan distance: ${Math.abs(ship.x) + Math.abs(ship.y)}`;
  }

  private normalizeAngle(angle: number): number {
    return ((angle % 360) + 360) % 360;
  }

  private rotateWaypoint(waypoint: Point, degrees: number): void {
    const normalizedDegrees = this.normalizeAngle(degrees);
    
    const radians = (normalizedDegrees * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    
    const newX = Math.round(waypoint.x * cos - waypoint.y * sin);
    const newY = Math.round(waypoint.x * sin + waypoint.y * cos);
    
    waypoint.x = newX;
    waypoint.y = newY;
  }
}