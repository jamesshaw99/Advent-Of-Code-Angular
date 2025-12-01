import { year2019day1 } from '../challenges/2019/day1';
import { year2019day2 } from '../challenges/2019/day2';
import { year2019day3 } from '../challenges/2019/day3';
import { year2019day4 } from '../challenges/2019/day4';
import { year2019day5 } from '../challenges/2019/day5';
import { year2019day6 } from '../challenges/2019/day6';
import { year2019day7 } from '../challenges/2019/day7';
import { year2020day1 } from '../challenges/2020/day1';
import { year2020day2 } from '../challenges/2020/day2';
import { year2020day3 } from '../challenges/2020/day3';
import { year2020day4 } from '../challenges/2020/day4';
import { year2020day5 } from '../challenges/2020/day5';
import { year2020day6 } from '../challenges/2020/day6';
import { year2020day7 } from '../challenges/2020/day7';
import { year2020day8 } from '../challenges/2020/day8';
import { year2020day9 } from '../challenges/2020/day9';
import { year2020day10 } from '../challenges/2020/day10';
import { year2020day11 } from '../challenges/2020/day11';
import { year2020day12 } from '../challenges/2020/day12';
import { year2020day13 } from '../challenges/2020/day13';
import { year2020day14 } from '../challenges/2020/day14';
import { year2020day15 } from '../challenges/2020/day15';
import { year2020day16 } from '../challenges/2020/day16';
import { year2020day17 } from '../challenges/2020/day17';
import { year2020day18 } from '../challenges/2020/day18';
import { year2020day19 } from '../challenges/2020/day19';
import { year2020day20 } from '../challenges/2020/day20';
import { year2020day21 } from '../challenges/2020/day21';
import { year2020day22 } from '../challenges/2020/day22';
import { year2020day23 } from '../challenges/2020/day23';
import { year2020day24 } from '../challenges/2020/day24';
import { year2020day25 } from '../challenges/2020/day25';
import { year2021day1 } from '../challenges/2021/day1';
import { year2021day2 } from '../challenges/2021/day2';
import { year2021day3 } from '../challenges/2021/day3';
import { year2021day4 } from '../challenges/2021/day4';
import { year2021day5 } from '../challenges/2021/day5';
import { year2021day6 } from '../challenges/2021/day6';
import { year2021day7 } from '../challenges/2021/day7';
import { year2021day8 } from '../challenges/2021/day8';
import { year2021day9 } from '../challenges/2021/day9';
import { year2021day10 } from '../challenges/2021/day10';
import { year2021day11 } from '../challenges/2021/day11';
import { year2021day12 } from '../challenges/2021/day12';
import { year2021day13 } from '../challenges/2021/day13';
import { year2021day14 } from '../challenges/2021/day14';
import { year2022day1 } from '../challenges/2022/day1';
import { year2022day2 } from '../challenges/2022/day2';
import { year2022day3 } from '../challenges/2022/day3';
import { year2022day4 } from '../challenges/2022/day4';
import { year2022day5 } from '../challenges/2022/day5';
import { year2022day6 } from '../challenges/2022/day6';
import { year2022day7 } from '../challenges/2022/day7';
import { year2023day1 } from '../challenges/2023/day1';
import { year2023day2 } from '../challenges/2023/day2';
import { year2023day3 } from '../challenges/2023/day3';
import { year2023day4 } from '../challenges/2023/day4';
import { year2023day5 } from '../challenges/2023/day5';
import { year2023day6 } from '../challenges/2023/day6';
import { year2023day7 } from '../challenges/2023/day7';
import { year2023day8 } from '../challenges/2023/day8';
import { year2023day9 } from '../challenges/2023/day9';
import { year2023day10 } from '../challenges/2023/day10';
import { year2023day11 } from '../challenges/2023/day11';
import { year2023day12 } from '../challenges/2023/day12';
import { year2024day1 } from '../challenges/2024/day1';
import { year2024day2 } from '../challenges/2024/day2';
import { year2024day3 } from '../challenges/2024/day3';
import { year2024day4 } from '../challenges/2024/day4';
import { year2024day5 } from '../challenges/2024/day5';
import { year2024day6 } from '../challenges/2024/day6';
import { year2024day7 } from '../challenges/2024/day7';
import { year2024day8 } from '../challenges/2024/day8';
import { year2024day9 } from '../challenges/2024/day9';
import { year2024day10 } from '../challenges/2024/day10';
import { year2024day11 } from '../challenges/2024/day11';
import { year2024day12 } from '../challenges/2024/day12';
import { year2025day1 } from '../challenges/2025/day1';
import { day } from './day';

interface ChallengeInstance {
  year: number;
  day: number;
  instance: InstanceType<typeof day>;
}

export const challengeInstances: ChallengeInstance[] = [
{ year: 2019, day: 1, instance: new year2019day1() },
{ year: 2019, day: 2, instance: new year2019day2() },
{ year: 2019, day: 3, instance: new year2019day3() },
{ year: 2019, day: 4, instance: new year2019day4() },
{ year: 2019, day: 5, instance: new year2019day5() },
{ year: 2019, day: 6, instance: new year2019day6() },
{ year: 2019, day: 7, instance: new year2019day7() },
{ year: 2020, day: 1, instance: new year2020day1() },
{ year: 2020, day: 2, instance: new year2020day2() },
{ year: 2020, day: 3, instance: new year2020day3() },
{ year: 2020, day: 4, instance: new year2020day4() },
{ year: 2020, day: 5, instance: new year2020day5() },
{ year: 2020, day: 6, instance: new year2020day6() },
{ year: 2020, day: 7, instance: new year2020day7() },
{ year: 2020, day: 8, instance: new year2020day8() },
{ year: 2020, day: 9, instance: new year2020day9() },
{ year: 2020, day: 10, instance: new year2020day10() },
{ year: 2020, day: 11, instance: new year2020day11() },
{ year: 2020, day: 12, instance: new year2020day12() },
{ year: 2020, day: 13, instance: new year2020day13() },
{ year: 2020, day: 14, instance: new year2020day14() },
{ year: 2020, day: 15, instance: new year2020day15() },
{ year: 2020, day: 16, instance: new year2020day16() },
{ year: 2020, day: 17, instance: new year2020day17() },
{ year: 2020, day: 18, instance: new year2020day18() },
{ year: 2020, day: 19, instance: new year2020day19() },
{ year: 2020, day: 20, instance: new year2020day20() },
{ year: 2020, day: 21, instance: new year2020day21() },
{ year: 2020, day: 22, instance: new year2020day22() },
{ year: 2020, day: 23, instance: new year2020day23() },
{ year: 2020, day: 24, instance: new year2020day24() },
{ year: 2020, day: 25, instance: new year2020day25() },
{ year: 2021, day: 1, instance: new year2021day1() },
{ year: 2021, day: 2, instance: new year2021day2() },
{ year: 2021, day: 3, instance: new year2021day3() },
{ year: 2021, day: 4, instance: new year2021day4() },
{ year: 2021, day: 5, instance: new year2021day5() },
{ year: 2021, day: 6, instance: new year2021day6() },
{ year: 2021, day: 7, instance: new year2021day7() },
{ year: 2021, day: 8, instance: new year2021day8() },
{ year: 2021, day: 9, instance: new year2021day9() },
{ year: 2021, day: 10, instance: new year2021day10() },
{ year: 2021, day: 11, instance: new year2021day11() },
{ year: 2021, day: 12, instance: new year2021day12() },
{ year: 2021, day: 13, instance: new year2021day13() },
{ year: 2021, day: 14, instance: new year2021day14() },
{ year: 2022, day: 1, instance: new year2022day1() },
{ year: 2022, day: 2, instance: new year2022day2() },
{ year: 2022, day: 3, instance: new year2022day3() },
{ year: 2022, day: 4, instance: new year2022day4() },
{ year: 2022, day: 5, instance: new year2022day5() },
{ year: 2022, day: 6, instance: new year2022day6() },
{ year: 2022, day: 7, instance: new year2022day7() },
{ year: 2023, day: 1, instance: new year2023day1() },
{ year: 2023, day: 2, instance: new year2023day2() },
{ year: 2023, day: 3, instance: new year2023day3() },
{ year: 2023, day: 4, instance: new year2023day4() },
{ year: 2023, day: 5, instance: new year2023day5() },
{ year: 2023, day: 6, instance: new year2023day6() },
{ year: 2023, day: 7, instance: new year2023day7() },
{ year: 2023, day: 8, instance: new year2023day8() },
{ year: 2023, day: 9, instance: new year2023day9() },
{ year: 2023, day: 10, instance: new year2023day10() },
{ year: 2023, day: 11, instance: new year2023day11() },
{ year: 2023, day: 12, instance: new year2023day12() },
{ year: 2024, day: 1, instance: new year2024day1() },
{ year: 2024, day: 2, instance: new year2024day2() },
{ year: 2024, day: 3, instance: new year2024day3() },
{ year: 2024, day: 4, instance: new year2024day4() },
{ year: 2024, day: 5, instance: new year2024day5() },
{ year: 2024, day: 6, instance: new year2024day6() },
{ year: 2024, day: 7, instance: new year2024day7() },
{ year: 2024, day: 8, instance: new year2024day8() },
{ year: 2024, day: 9, instance: new year2024day9() },
{ year: 2024, day: 10, instance: new year2024day10() },
{ year: 2024, day: 11, instance: new year2024day11() },
{ year: 2024, day: 12, instance: new year2024day12() },
{ year: 2025, day: 1, instance: new year2025day1() }
];
