const FramesOf4thNote = 30;
const FramesOf8thNote = 15;
const FramesOf16thNote = 8;
const FramesOf32thNote = 4;

type AnimationIteratorValues = number[];
type AnimationIterator = AnimationIteratorValues | Effector;

interface Animation<T extends EgretGameObject, S extends string> {
  frames: number;
  scales?: AnimationIterator;
  alphas?: AnimationIterator;
  onStart?: (object: T, previous: S, options: { animation: Animation<T, S>, manager: AnimationManager<T, S> }) => void;
  onFrame?: (object: T, options: { animation: Animation<T, S>, counter: number, longCounter: number, manager: AnimationManager<T, S> }) => void;
  onComplete?: (object: T, options: { animation: Animation<T, S>, manager: AnimationManager<T, S> }) => void;
}

class AnimationManager<T extends EgretGameObject, STATE extends string> {
  private longCounter: number;
  private counter_: number;
  private state_: STATE;
  private queue: STATE[] = [];
  private animations: { [key: string]: Animation<T, STATE> };
  private object: T;

  constructor(object: T, animations: { [key: string]: Animation<T, STATE> }, initial: STATE) {
    if (!animations[initial]) {
      throw new Error(`指定したステータス(${initial})は存在しません`);
    }
    this.state_ = initial;
    this.counter_ = 0;
    this.longCounter = 0;
    this.animations = animations;
    this.object = object;
  }

  get counter(): number {
    return this.counter_;
  }

  get state(): STATE {
    return this.state_;
  }

  next(value: STATE | STATE[]): void {
    console.log("next", value);
    if (Array.isArray(value)) {
      const poped = value.shift();
      value.forEach(v => this.queue.push(v));
      value = poped;
    } else {
      this.queue = [];
    }
    const next = this.animations[value];
    if (value === undefined) {
      throw new Error(`指定したステータス(${this.state_})は存在しません`);
    }
    if (next.onStart) {
      next.onStart(this.object, this.state_, { animation: next, manager: this });
    }
    this.state_ = value;
    this.counter_ = 0;
  }

  popNext() {
    if (this.queue.length === 0) {
      throw new Error(`次のステータスが存在しません`);
    }
    const next = this.queue.shift();
    this.next(next);
  }

  update(): void {
    const object = this.object;
    const a: Animation<T, STATE> = this.animations[this.state_];
    if (a === undefined) {
      throw new Error(`指定したステータス(${this.state_})は存在しません`);
    }
    if (a.alphas) {
      if (a.alphas instanceof Function) {
        object.alpha = a.alphas(this.counter_, a.frames);
      } else {
        object.alpha = a.alphas[Math.min(this.counter_, a.alphas.length - 1)];
      }
    }
    if (a.scales) {
      if (a.scales instanceof Function) {
        object.scaleX = object.scaleY = a.scales(this.counter_, a.frames);
      } else {
        object.scaleX = object.scaleY = a.scales[Math.min(this.counter_, a.scales.length - 1)];
      }
    }
    if (a.onFrame) {
      a.onFrame(object, { animation: a, longCounter: this.longCounter, counter: this.counter_, manager: this });
    }
    this.counter_++;
    this.longCounter++;
    if (this.counter_ === a.frames) {
      if (a.onComplete) {
        a.onComplete(object, { animation: a, manager: this });
      } else {
        this.counter_ = 0;
      }
    }
  }


}