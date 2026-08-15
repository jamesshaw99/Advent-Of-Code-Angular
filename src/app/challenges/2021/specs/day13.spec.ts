import { year2021day13 } from '../day13';

describe('2021 day13', () => {
  const officialInput = [
    '6,10',
    '0,14',
    '9,10',
    '0,3',
    '10,4',
    '4,11',
    '6,0',
    '6,12',
    '4,1',
    '0,13',
    '10,12',
    '3,4',
    '3,0',
    '8,4',
    '1,10',
    '2,14',
    '8,10',
    '9,0',
    '',
    'fold along y=7',
    'fold along x=5',
  ];

  let dayInstance: year2021day13;

  beforeEach(() => {
    dayInstance = new year2021day13();
    dayInstance.input = officialInput;
    dayInstance.preChallenge();
  });

  describe('part1', () => {
    it('counts the visible dots after the first fold', () => {
      expect(dayInstance.part1()).toBe('Visible dots after one fold: 17');
    });
  });

  describe('part2', () => {
    it('prints the code formed after completing every fold', () => {
      expect(dayInstance.part2()).toBe(
        'Infrared thermal imaging camera system code:<br>#####<br>#   #<br>#   #<br>#   #<br>#####'
      );
    });
  });
});
