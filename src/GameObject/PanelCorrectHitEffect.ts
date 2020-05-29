type PanelCorrectHitEffectShapeOption = {
  radius: number;
  color: number;
  lineWidth: number;
};

class PanelCorrectHitEffect extends EgretGameObject {

  private static animations: { [key: string]: Animation<PanelCorrectHitEffect, ComboType> } = {
    "single": {
      frames: FramesOf4thNote * 1,
      scales: easeOut(1.0, 1.2),
      alphas: easeOut(0.6, 0),
      onComplete: (object, {}) => { object.destroy(); }
    },
    "combo1": {
      frames: FramesOf4thNote * 2,
      scales: easeOut(1.0, 1.2),
      alphas: easeOut(0.6, 0),
      onComplete: (object, {}) => { object.destroy(); }
    },
    "combo2": {
      frames: FramesOf4thNote * 4,
      scales: easeOut(1.0, 1.2),
      alphas: easeOut(0.6, 0),
      onComplete: (object, {}) => { object.destroy(); }
    },
    "combo3": {
      frames: FramesOf4thNote * 6,
      scales: easeOut(1.0, 1.2),
      alphas: easeOut(0.6, 0),
      onComplete: (object, {}) => { object.destroy(); }
    },
    "combo4": {
      frames: FramesOf4thNote * 8,
      scales: easeOut(1.0, 1.2),
      alphas: easeOut(0.6, 0),
      onComplete: (object, {}) => { object.destroy(); }
    }
  }

  private static shapes: { [key: string]: { shapes: PanelCorrectHitEffectShapeOption[] } } = {
    "single": {
      shapes: [
        { radius: 1.10, color: 0xffffff, lineWidth: 4 },
      ]
    },
    "combo1": {
      shapes: [
        { radius: 1.10, color: 0xffffff, lineWidth: 4 },
        { radius: 1.20, color: 0xffccff, lineWidth: 6 },
      ]
    },
    "combo2": {
      shapes: [
        { radius: 1.10, color: 0xffffff, lineWidth: 4 },
        { radius: 1.20, color: 0xffccff, lineWidth: 6 },
        { radius: 1.40, color: 0xccffff, lineWidth: 8 },
      ]
    },
    "combo3": {
      shapes: [
        { radius: 1.10, color: 0xffffff, lineWidth: 4 },
        { radius: 1.20, color: 0xffccff, lineWidth: 6 },
        { radius: 1.40, color: 0xccffff, lineWidth: 8 },
        { radius: 1.80, color: 0xffffcc, lineWidth: 10 },
      ]
    },
    "combo4": {
      shapes: [
        { radius: 1.10, color: 0xffffff, lineWidth: 4 },
        { radius: 1.20, color: 0xffccff, lineWidth: 6 },
        { radius: 1.40, color: 0xccffff, lineWidth: 8 },
        { radius: 1.80, color: 0xffffcc, lineWidth: 10 },
        { radius: 2.60, color: 0xcccccc, lineWidth: 12 },
      ]
    }
  };

  private animationManager: AnimationManager<PanelCorrectHitEffect, ComboType>;

  constructor(type: ComboType, x: number, y: number, radius: number, color: number) {
    super();
    this.position = { x, y };

    this.animationManager = new AnimationManager(this, PanelCorrectHitEffect.animations, type);
    PanelCorrectHitEffect.shapes[type].shapes.forEach(s => {
      this.addEgretDisplayObject(createCircleFrameShape(0, 0, radius * s.radius, s.color, s.lineWidth));
    });
  }

  onUpdate() {
    this.animationManager.update();
  }
}