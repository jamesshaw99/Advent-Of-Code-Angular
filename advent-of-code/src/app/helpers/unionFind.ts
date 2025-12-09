export class UnionFind {
    private parent: number[];
    private size: number[];

    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.size = Array(n).fill(1);
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x: number, y: number): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) {
            return false;
        }

        if (this.size[rootX] < this.size[rootY]) {
            this.parent[rootX] = rootY;
            this.size[rootY] += this.size[rootX];
        } else {
            this.parent[rootY] = rootX;
            this.size[rootX] += this.size[rootY];
        }

        return true;
    }

    getComponentSizes(): number[] {
        const roots = new Map<number, number>();
        
        for (let i = 0; i < this.parent.length; i++) {
            const root = this.find(i);
            roots.set(root, this.size[root]);
        }

        return Array.from(roots.values());
    }
}