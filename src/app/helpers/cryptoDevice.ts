export class CryptoDevice {
  private static readonly MODULO = 20201227;
  private static readonly SUBJECT_NUMBER = 7;

  public static findLoopSize(publicKey: number): number {
    let value = 1;
    let loopSize = 0;

    while (value !== publicKey) {
      value = this.transform(value, this.SUBJECT_NUMBER);
      loopSize++;
    }

    return loopSize;
  }

  public static generateEncryptionKey(publicKey: number, loopSize: number): number {
    let value = 1;

    for (let i = 0; i < loopSize; i++) {
      value = this.transform(value, publicKey);
    }

    return value;
  }

  public static transform(value: number, subjectNumber: number): number {
    return (value * subjectNumber) % this.MODULO;
  }

  public static findEncryptionKey(cardPublicKey: number, doorPublicKey: number): number {
    let value = 1;
    let loopSize = 0;

    while (true) {
      value = this.transform(value, this.SUBJECT_NUMBER);
      loopSize++;

      if (value === cardPublicKey) {
        return this.generateEncryptionKey(doorPublicKey, loopSize);
      }
      
      if (value === doorPublicKey) {
        return this.generateEncryptionKey(cardPublicKey, loopSize);
      }
    }
  }
}