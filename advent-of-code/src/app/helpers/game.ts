export class Game {
    private readonly gameNo: number;
    private red = 0;
    private blue = 0;
    private green = 0;

    constructor(gameNo: number) {
        this.gameNo = gameNo;
    }

    public update(newRed: number, newGreen: number, newBlue: number): void {
        this.red = Math.max(this.red, newRed);
        this.green = Math.max(this.green, newGreen);
        this.blue = Math.max(this.blue, newBlue);
    }

    public getGameNo(): number {
        return this.gameNo;
    }

    public getRed(): number {
        return this.red;
    }

    public getBlue(): number {
        return this.blue;
    }

    public getGreen(): number {
        return this.green;
    }

    public getPower(): number {
        return this.red * this.green * this.blue;
    }
}