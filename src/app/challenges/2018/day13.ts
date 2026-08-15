import { day } from '../../helpers/day';
import { readingOrder } from '../../helpers/grid';

type Facing = 'up' | 'right' | 'down' | 'left';

interface Cart {
  x: number;
  y: number;
  facing: Facing;
  turnState: number;
  removed: boolean;
}

const FACINGS: Facing[] = ['up', 'right', 'down', 'left'];
const DELTA: Record<Facing, { dx: number; dy: number }> = {
  up: { dx: 0, dy: -1 },
  right: { dx: 1, dy: 0 },
  down: { dx: 0, dy: 1 },
  left: { dx: -1, dy: 0 },
};
const CART_TRACK: Record<string, string> = { '^': '|', v: '|', '<': '-', '>': '-' };
const CART_FACING: Record<string, Facing> = { '^': 'up', v: 'down', '<': 'left', '>': 'right' };

export class year2018day13 extends day {
  private tracks = new Map<string, string>();
  private carts: Cart[] = [];

  override preChallenge(): void {
    this.tracks = new Map();
    this.carts = [];

    this.input.forEach((row, y) => {
      [...row].forEach((char, x) => {
        if (char === ' ') {
          return;
        }
        if (char in CART_FACING) {
          this.carts.push({ x, y, facing: CART_FACING[char], turnState: 0, removed: false });
          this.tracks.set(`${x},${y}`, CART_TRACK[char]);
        } else {
          this.tracks.set(`${x},${y}`, char);
        }
      });
    });
  }

  override part1(): string {
    const carts = this.cloneCarts();

    while (true) {
      const ordered = [...carts].sort(readingOrder);
      for (const cart of ordered) {
        if (cart.removed) {
          continue;
        }
        this.moveCart(cart);
        const collided = carts.find(other => other !== cart && !other.removed && other.x === cart.x && other.y === cart.y);
        if (collided) {
          return `${cart.x},${cart.y}`;
        }
      }
    }
  }

  override part2(): string {
    const carts = this.cloneCarts();

    while (carts.filter(cart => !cart.removed).length > 1) {
      const ordered = [...carts].sort(readingOrder);
      for (const cart of ordered) {
        if (cart.removed) {
          continue;
        }
        this.moveCart(cart);
        const collided = carts.find(other => other !== cart && !other.removed && other.x === cart.x && other.y === cart.y);
        if (collided) {
          cart.removed = true;
          collided.removed = true;
        }
      }
    }

    const survivor = carts.find(cart => !cart.removed)!;
    return `${survivor.x},${survivor.y}`;
  }

  private moveCart(cart: Cart): void {
    const { dx, dy } = DELTA[cart.facing];
    cart.x += dx;
    cart.y += dy;

    const track = this.tracks.get(`${cart.x},${cart.y}`);
    if (track === '/') {
      cart.facing = { up: 'right', right: 'up', down: 'left', left: 'down' }[cart.facing] as Facing;
    } else if (track === '\\') {
      cart.facing = { up: 'left', left: 'up', down: 'right', right: 'down' }[cart.facing] as Facing;
    } else if (track === '+') {
      const currentIndex = FACINGS.indexOf(cart.facing);
      const turn = cart.turnState % 3;
      if (turn === 0) {
        cart.facing = FACINGS[(currentIndex + 3) % 4];
      } else if (turn === 2) {
        cart.facing = FACINGS[(currentIndex + 1) % 4];
      }
      cart.turnState++;
    }
  }

  private cloneCarts(): Cart[] {
    return this.carts.map(cart => ({ ...cart }));
  }
}
