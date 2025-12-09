import { day } from '../../helpers/day';
import { UnionFind } from '../../helpers/unionFind';
import { Point3D } from '../../models/point';

interface Edge {
  from: number;
  to: number;
  distance: number;
}

export class year2025day8 extends day {
  junctionBoxes: Point3D[] = [];
  connectionsToMake = 1000;
  edges: Edge[] = [];

  override preChallenge(): void {
    for (const line of this.input) {
      const [x, y, z] = line.split(',').map(Number);
      this.junctionBoxes.push({ x, y, z });
    }
    
    this.edges = this.getAllEdges(this.junctionBoxes);
  }

  override part1(): string {
    const uf = new UnionFind(this.junctionBoxes.length);

    for (let i = 0; i < Math.min(this.connectionsToMake, this.edges.length); i++) {
        const edge = this.edges[i];
        
        uf.union(edge.from, edge.to)
    }

    const componentSizes = uf.getComponentSizes();
    componentSizes.sort((a, b) => b - a);
    const result = componentSizes[0] * componentSizes[1] * componentSizes[2];

    return `The product of the three largest circuits is ${result}`;
  }

  override part2(): string {
    const uf = new UnionFind(this.junctionBoxes.length);

    const totalBoxes = this.junctionBoxes.length;
    let connectionsSucceeded = 0;
    let lastConnection: Edge | null = null;

    for (const edge of this.edges) {
        if(uf.union(edge.from, edge.to)) {
            connectionsSucceeded++;
            lastConnection = edge;

            if(connectionsSucceeded === totalBoxes - 1) {
                break;
            }
        }
    }

    if (!lastConnection) {
        throw new Error("No connections were made!");
    }

    const box1 = this.junctionBoxes[lastConnection.from];
    const box2 = this.junctionBoxes[lastConnection.to];
    const result = box1.x * box2.x;

    return `The product of the x coordinates of the last two boxes is ${result}`;
  }

  calculateDistance(p1: Point3D, p2: Point3D): number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const dz = p1.z - p2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  getAllEdges(points: Point3D[]): Edge[] {
    const edges: Edge[] = [];

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        edges.push({
          from: i,
          to: j,
          distance: this.calculateDistance(points[i], points[j]),
        });
      }
    }

    edges.sort((a, b) => a.distance - b.distance);

    return edges;
  }
}
