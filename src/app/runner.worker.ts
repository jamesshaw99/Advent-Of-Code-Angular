import { challengesByYear } from './helpers/challenge-definitions';

addEventListener('message', async ({ data }) => {
  const { year, day, input } = data;

  try {
    const challenge = challengesByYear[year]?.[day];

    if (!challenge) {
      throw new Error(`Challenge for Year ${year}, Day ${day} not found.`);
    }

    const { part1, part2, timePart1, timePart2 } = await challenge.run(input);
    postMessage({ part1, part2, timePart1, timePart2 });
  }  catch (err: unknown) {
    if (err instanceof Error) {
      postMessage({ error: err.message, stack: err.stack });
    } else {
      postMessage({ error: 'An unknown error occurred in the worker' });
    }
  }
});