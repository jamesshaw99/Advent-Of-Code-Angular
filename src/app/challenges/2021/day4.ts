import { BingoBoard } from "../../helpers/bingoBoard";
import { day } from "../../helpers/day";

export class year2021day4 extends day {
    private numbers: number[] = [];
    private boards: BingoBoard[] = [];

    override preChallenge(): void {
        this.numbers = this.input[0].split(',').map(Number);
        
        const boardInputs: string[] = [];
        for (let i = 2; i < this.input.length; i++) {
            const line = this.input[i].trim();
            if (line === '') continue;
            
            boardInputs.push(line);
            if (boardInputs.length === 5) {
                this.boards.push(new BingoBoard(boardInputs));
                boardInputs.length = 0;
            }
        }
    }

    override part1(): string {
        const gameBoards = this.boards.map(board => board.clone());
        
        for (const number of this.numbers) {
            for (let i = 0; i < gameBoards.length; i++) {
                if (gameBoards[i].checkInput(number)) {
                    return `Winner: ${i + 1}, score: ${gameBoards[i].getScore()}`;
                }
            }
        }
        return 'No winner found';
    }

    override part2(): string {
        let activeBoards = this.boards.map((board, index) => ({ 
            board: board.clone(), 
            id: index + 1 
        }));
        
        for (const number of this.numbers) {
            const winners: typeof activeBoards = [];
            const remaining: typeof activeBoards = [];
            
            for (const boardData of activeBoards) {
                if (boardData.board.checkInput(number)) {
                    winners.push(boardData);
                } else {
                    remaining.push(boardData);
                }
            }
            
            if (activeBoards.length === 1 && winners.length === 1) {
                return `Winner: ${winners[0].id}, score: ${winners[0].board.getScore()}`;
            }
            
            activeBoards = remaining;
        }
        
        return 'No last winner found';
    }
}