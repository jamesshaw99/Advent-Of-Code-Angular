export class BingoBoard {
    private board: number[][] = [];
    private numberToPosition = new Map<number, [number, number]>();
    private lastNumber = 0;

    constructor(input: string[]);
    constructor(newBoard: number[][]);
    constructor(inputOrBoard: string[] | number[][]) {
        if (typeof inputOrBoard[0] === 'string') {
            this.board = (inputOrBoard as string[]).map(x => 
                x.trim().split(/\s+/).map(Number)
            );
        } else {
            this.board = (inputOrBoard as number[][]).map(row => [...row]);
        }
        this.buildPositionMap();
    }

    private buildPositionMap(): void {
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                this.numberToPosition.set(this.board[row][col], [row, col]);
            }
        }
    }

    checkInput(num: number): boolean {
        this.lastNumber = num;
        const position = this.numberToPosition.get(num);
        
        if (!position) return false;
        
        const [row, col] = position;
        this.board[row][col] = -1;
        this.numberToPosition.delete(num);
        
        return this.isRowComplete(row) || this.isColumnComplete(col);
    }

    private isRowComplete(row: number): boolean {
        return this.board[row].every(cell => cell === -1);
    }

    private isColumnComplete(col: number): boolean {
        return this.board.every(row => row[col] === -1);
    }

    getScore(): number {
        const sum = this.board.flat().filter(val => val !== -1).reduce((acc, val) => acc + val, 0);
        return sum * this.lastNumber;
    }

    printBoard(): void {
        console.table(this.board);
    }

    clone(): BingoBoard {
        return new BingoBoard(this.board);
    }
}