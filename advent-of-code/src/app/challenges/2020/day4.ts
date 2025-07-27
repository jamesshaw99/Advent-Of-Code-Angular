import { day } from "../../helpers/day";

export class year2020day4 extends day {
  private passports: Map<string, string>[] = [];
  private readonly REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'pid', 'ecl'] as const;
  private readonly EYE_COLORS = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);
  private readonly HAIR_COLOR_REGEX = /^#[0-9a-f]{6}$/;
  private readonly PASSPORT_ID_REGEX = /^\d{9}$/;

  override preChallenge(): void {
    let currentPassport = new Map<string, string>();

    for (const line of this.input) {
      if (line.trim() === '') {
        if (currentPassport.size > 0) {
          this.passports.push(currentPassport);
          currentPassport = new Map<string, string>();
        }
      } else {
        const pairs = line.split(' ');
        for (const pair of pairs) {
          const [key, value] = pair.split(':');
          currentPassport.set(key, value);
        }
      }
    }

    if (currentPassport.size > 0) {
      this.passports.push(currentPassport);
    }
  }

  override part1(): string {
    const validPassports = this.passports.filter(passport => 
      this.REQUIRED_FIELDS.every(field => passport.has(field))
    );

    return `${validPassports.length} passports are valid`;
  }

  override part2(): string {
    const validPassports = this.passports.filter(passport => 
      this.isValidPassport(passport)
    );

    return `${validPassports.length} passports are valid`;
  }

  private isValidPassport(passport: Map<string, string>): boolean {
    return this.REQUIRED_FIELDS.every(field => {
      const value = passport.get(field);
      if (!value) return false;

      return this.isValidField(field, value);
    });
  }

  private isValidField(field: string, value: string): boolean {
    switch (field) {
      case 'byr':
        return this.isValidYear(value, 1920, 2002);
      case 'iyr':
        return this.isValidYear(value, 2010, 2020);
      case 'eyr':
        return this.isValidYear(value, 2020, 2030);
      case 'hgt':
        return this.isValidHeight(value);
      case 'hcl':
        return this.HAIR_COLOR_REGEX.test(value);
      case 'ecl':
        return this.EYE_COLORS.has(value);
      case 'pid':
        return this.PASSPORT_ID_REGEX.test(value);
      default:
        return false;
    }
  }

  private isValidYear(value: string, min: number, max: number): boolean {
    const year = parseInt(value, 10);
    return !isNaN(year) && year >= min && year <= max;
  }

  private isValidHeight(value: string): boolean {
    if (value.endsWith('cm')) {
      const height = parseInt(value.slice(0, -2), 10);
      return !isNaN(height) && height >= 150 && height <= 193;
    } else if (value.endsWith('in')) {
      const height = parseInt(value.slice(0, -2), 10);
      return !isNaN(height) && height >= 59 && height <= 76;
    }
    return false;
  }
}