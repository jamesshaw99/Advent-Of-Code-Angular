export class Dir {
    name: string;
    size = 0;
    parent: Dir | null;

    constructor(name: string, parent: Dir | null = null) {
        this.name = name;
        this.parent = parent;
    }
}