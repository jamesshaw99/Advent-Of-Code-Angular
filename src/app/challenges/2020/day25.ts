import { CryptoDevice } from "../../helpers/cryptoDevice";
import { day } from "../../helpers/day";

export class year2020day25 extends day {
  private cardPublicKey!: number;
  private doorPublicKey!: number;

  override preChallenge(): void {
    this.cardPublicKey = parseInt(this.input[0]);
    this.doorPublicKey = parseInt(this.input[1]);
  }

  override part1(): string {
    const encryptionKey = CryptoDevice.findEncryptionKey(
      this.cardPublicKey, 
      this.doorPublicKey
    );
    
    return encryptionKey.toString();
  }

  override part2(): string {
    return 'I Won';
  }
}