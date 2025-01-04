import { challengeInstances } from './helpers/challenge-definitions';

addEventListener('message', async ({ data }) => {
  const { year, day, input } = data;

  try {
    const challenge = challengeInstances.find(
      (item) => item.year === year && item.day === day
    )?.instance;

    if (!challenge) {
      throw new Error(`Challenge for Year ${year}, Day ${day} not found.`);
    }

    const { part1, part2, timePart1, timePart2 } = challenge.run(input);
    postMessage({ part1, part2, timePart1, timePart2 });
  }  catch (err: unknown) {
    if (err instanceof Error) {
      postMessage({ error: err.message, stack: err.stack });
    } else {
      postMessage({ error: 'An unknown error occurred in the worker' });
    }
  }
});