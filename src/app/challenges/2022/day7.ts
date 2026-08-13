import { day } from "../../helpers/day";
import { Dir } from "../../helpers/dir";

export class year2022day7 extends day {
    private dirs = new Map<string, Dir>();
    private root!: Dir;

    override part1(): string {
        this.buildFileSystem();
        const sum = Array.from(this.dirs.values())
            .filter(dir => dir.size <= 100000)
            .reduce((acc, dir) => acc + dir.size, 0);
        
        return `sum of sub 100000 directories: ${sum}`;
    }

    override part2(): string {
        this.buildFileSystem();
        const required = this.dirs.get("/root")!.size - 40000000;
        
        const candidate = Array.from(this.dirs.values())
            .filter(dir => dir.size >= required)
            .reduce((min, dir) => dir.size < min.size ? dir : min);
        
        return `Size of smallest directory to delete: ${candidate.size}`;
    }

    private buildFileSystem(): void {
        this.dirs.clear();
        this.root = new Dir("root");
        this.dirs.set("/root", this.root);

        let currentDir = this.root;
        let currentPath = "/root";

        for (const command of this.input) {
            const parts = command.split(" ");
            
            if (parts[0] === "$" && parts[1] === "cd") {
                const target = parts[2];
                
                if (target === "/") {
                    currentDir = this.root;
                    currentPath = "/root";
                } else if (target === "..") {
                    currentPath = this.getParentPath(currentPath, currentDir.name);
                    currentDir = currentDir.parent!;
                } else {
                    currentPath = `${currentPath}/${target}`;
                    
                    let targetDir = this.dirs.get(currentPath);
                    if (!targetDir) {
                        targetDir = new Dir(target, currentDir);
                        this.dirs.set(currentPath, targetDir);
                    }
                    currentDir = targetDir;
                }
            } else if (parts[0] !== "$" && parts[0] !== "dir") {
                const fileSize = parseInt(parts[0]);
                this.addSizeToPath(currentPath, fileSize);
            }
        }
    }

    private addSizeToPath(path: string, size: number): void {
        let currentPath = path;
        let dir = this.dirs.get(currentPath);
        
        while (dir) {
            dir.size += size;
            if (dir.parent) {
                currentPath = this.getParentPath(currentPath, dir.name);
                dir = dir.parent;
            } else {
                break;
            }
        }
    }

    private getParentPath(currentPath: string, dirName: string): string {
        return currentPath.substring(0, currentPath.lastIndexOf(`/${dirName}`));
    }
}