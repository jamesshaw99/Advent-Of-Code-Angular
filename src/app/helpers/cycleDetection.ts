export interface CycleDetectionResult<T> {
  terminated: boolean;
  state: T;
  steps: number;
}

export function runUntilCycleOrTerminal<T>(
  initialState: T,
  step: (state: T) => T,
  key: (state: T) => string,
  isTerminal: (state: T) => boolean = () => false
): CycleDetectionResult<T> {
  const seen = new Set<string>();
  let state = initialState;
  let steps = 0;

  while (true) {
    if (isTerminal(state)) {
      return { terminated: true, state, steps };
    }

    const stateKey = key(state);
    if (seen.has(stateKey)) {
      return { terminated: false, state, steps };
    }
    seen.add(stateKey);

    state = step(state);
    steps++;
  }
}
