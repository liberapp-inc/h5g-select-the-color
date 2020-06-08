

type Effector = (frame: number, frames: number) => number;
type Effectors = [number, Effector][];

/**
 * @see https://github.com/jquery/themeroller.jquerymobile.com/blob/23287b9b970c20c2473359430f98d6ca38ebf153/js/lib/jquery.ui.js
 * @param t current time
 * @param b  begInnIng value
 * @param c change In value
 * @param d duration
 */
function easeOutElastic(start: number, end: number): Effector {
  const changeInValue = end - start;
  return (frame: number, frames: number): number => {
    let s = 1.70158;
    let p = 0;
    let a = changeInValue;
    if (frame === 0) {
      return start;
    }
    if (frame === frames) {
      return end;
    }
    if (!p) {
      p = frames * 0.3;
    }
    if (a < Math.abs(changeInValue)) {
      a = changeInValue;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(changeInValue / a);
    }
    return a * 2 ** (-10 * frame) * Math.sin((frame * frames - s) * (2 * Math.PI) / p) + end;
  };

}

/// http://nakamura001.hatenablog.com/entry/20111117/1321539246
/// Quintic
function easeOut(start: number, end: number): Effector {
  return (frame: number, frames: number) => {
    if (frame === 0) {
      return start;
    }
    if (frame === frames - 1) {
      return end;
    }
    const t = frame / frames - 1;
    const b = start;
    const c = end - start;
    const r = - c * (t * t * t * t - 1) + b;
    return r;
  }
}

/// Quintic
function easeInOut(start: number, end: number): Effector {
  return (frame: number, frames: number) => {
    if (frame === 0) {
      return start;
    }
    if (frame === frames - 1) {
      return end;
    }
    let t = frame / frames / 2;
    const b = start;
    const c = end - start;
    const d = frames;
    if (t < 1) {
      return c / 2.0 * t * t * t * t * t + b;
    }
    t = t - 2;
    return c / 2.0 * (t * t * t * t * t + 2) + b;
  };
}

/// https://tomari.org/main/java/audioapi/audio_adsr.html
function adsr(zeroLevel: number, attackLevel: number, attackFrames: number, decayFrames: number, sustainLevel: number, sustainFrames: number, releaseFrames: number): Effector {
  return (frame: number, frames: number) => {
    if (frame <= attackFrames) {
      const t = frame / attackFrames;
      const b = zeroLevel;
      const c = attackLevel - zeroLevel;
      const r = c * t + b;
      return r;
    }
    if (frame <= attackFrames + decayFrames) {
      const t = (frame - attackFrames) / decayFrames;
      const b = attackLevel;
      const c = sustainLevel - attackLevel;
      const r = c * t + b;
      return r;
    }
    if (frame <= attackFrames + decayFrames + sustainFrames) {
      return sustainLevel;
    }
    if (frame <= attackFrames + decayFrames + sustainFrames + releaseFrames) {
      const t = (frame - attackFrames - decayFrames - sustainFrames) / releaseFrames;
      const b = sustainLevel;
      const c = zeroLevel - sustainLevel;
      const r = c * t + b;
      return r;
    }
    return 0;
  }
}

function lfo(base: number, depth: number, framesOfLoop: number): Effector {
  return (frame: number, frames: number): number => {
    const rd = 2 * Math.PI * frame / framesOfLoop;
    return base + Math.sin(rd) * depth;
  };
}

function getLfo(depth: number): (p: number) => number {
  return (p: number): number => {
    const rd = 2 * Math.PI * p;
    return 1 + Math.sin(rd) * depth;
  };
}