export interface WeightedEdge<T> {
  node: T;
  cost: number;
}

export interface BfsResult<T> {
  node: T;
  distance: number;
}

class MinHeap<T> {
  private items: { priority: number; value: T }[] = [];

  get size(): number {
    return this.items.length;
  }

  push(value: T, priority: number): void {
    this.items.push({ value, priority });
    this.bubbleUp(this.items.length - 1);
  }

  pop(): { value: T; priority: number } | undefined {
    if (this.items.length === 0) {
      return undefined;
    }

    const top = this.items[0];
    const last = this.items.pop()!;

    if (this.items.length > 0) {
      this.items[0] = last;
      this.bubbleDown(0);
    }

    return top;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = (index - 1) >> 1;
      if (this.items[parent].priority <= this.items[index].priority) {
        break;
      }
      [this.items[parent], this.items[index]] = [this.items[index], this.items[parent]];
      index = parent;
    }
  }

  private bubbleDown(index: number): void {
    const length = this.items.length;

    while (true) {
      const left = index * 2 + 1;
      const right = index * 2 + 2;
      let smallest = index;

      if (left < length && this.items[left].priority < this.items[smallest].priority) {
        smallest = left;
      }
      if (right < length && this.items[right].priority < this.items[smallest].priority) {
        smallest = right;
      }
      if (smallest === index) {
        break;
      }

      [this.items[smallest], this.items[index]] = [this.items[index], this.items[smallest]];
      index = smallest;
    }
  }
}

/**
 * Unweighted (unit-cost) breadth-first search from `start`, visiting every reachable node.
 * Stops early once a node matching `isEnd` is dequeued, if provided.
 */
export function bfs<T>(
  start: T,
  key: (node: T) => string,
  neighbors: (node: T) => T[],
  isEnd?: (node: T) => boolean
): Map<string, BfsResult<T>> {
  const visited = new Map<string, BfsResult<T>>();
  visited.set(key(start), { node: start, distance: 0 });

  const queue: T[] = [start];
  let head = 0;

  while (head < queue.length) {
    const current = queue[head++];
    const currentDistance = visited.get(key(current))!.distance;

    if (isEnd?.(current)) {
      break;
    }

    for (const next of neighbors(current)) {
      const nextKey = key(next);
      if (!visited.has(nextKey)) {
        visited.set(nextKey, { node: next, distance: currentDistance + 1 });
        queue.push(next);
      }
    }
  }

  return visited;
}

/**
 * Weighted shortest-path search from one or more seeded starting nodes. Returns the best
 * known cost to every reachable node, visiting the whole graph rather than stopping early.
 */
export function dijkstraAll<T>(
  starts: { node: T; cost: number }[],
  key: (node: T) => string,
  neighbors: (node: T) => WeightedEdge<T>[]
): Map<string, number> {
  const best = new Map<string, number>();
  const heap = new MinHeap<T>();

  for (const { node, cost } of starts) {
    const startKey = key(node);
    if (cost < (best.get(startKey) ?? Infinity)) {
      best.set(startKey, cost);
      heap.push(node, cost);
    }
  }

  while (heap.size > 0) {
    const current = heap.pop()!;
    const currentKey = key(current.value);

    if (current.priority > (best.get(currentKey) ?? Infinity)) {
      continue;
    }

    for (const edge of neighbors(current.value)) {
      const nextKey = key(edge.node);
      const nextDistance = current.priority + edge.cost;

      if (nextDistance < (best.get(nextKey) ?? Infinity)) {
        best.set(nextKey, nextDistance);
        heap.push(edge.node, nextDistance);
      }
    }
  }

  return best;
}

/**
 * Weighted shortest-path search. Returns the cost of the first node matching `isEnd`,
 * or Infinity if no such node is reachable.
 */
export function dijkstra<T>(
  start: T,
  key: (node: T) => string,
  neighbors: (node: T) => WeightedEdge<T>[],
  isEnd: (node: T) => boolean
): number {
  const best = new Map<string, number>();
  const heap = new MinHeap<T>();

  best.set(key(start), 0);
  heap.push(start, 0);

  while (heap.size > 0) {
    const current = heap.pop()!;
    const currentKey = key(current.value);

    if (current.priority > (best.get(currentKey) ?? Infinity)) {
      continue;
    }

    if (isEnd(current.value)) {
      return current.priority;
    }

    for (const edge of neighbors(current.value)) {
      const nextKey = key(edge.node);
      const nextDistance = current.priority + edge.cost;

      if (nextDistance < (best.get(nextKey) ?? Infinity)) {
        best.set(nextKey, nextDistance);
        heap.push(edge.node, nextDistance);
      }
    }
  }

  return Infinity;
}
