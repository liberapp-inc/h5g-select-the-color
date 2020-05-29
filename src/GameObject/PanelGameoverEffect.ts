type GameoverKind = "normal" | "best";

type PanelGameoverEffectShapeOption = {
  radius: number;
  color: number;
  lineWidth: number;
};

class PanelGameoverEffect extends EgretGameObject {

  private static animations: { [key: string]: Animation<PanelGameoverEffect, GameoverKind> } = {
    "normal": {
      frames: FramesOf4thNote * 4,
      scales: easeOut(1.0, 1.05),
      alphas: easeOut(0.4, 0),
      onComplete: (object, {}) => { object.destroy(); }
    },
    "best": {
      frames: FramesOf4thNote * 4,
      scales: easeOut(1.0, 1.2),
      alphas: easeOut(0.6, 0),
      onComplete: (object, {}) => { object.destroy(); }
    }
  }

  private static shapes: { [key: string]: { shapes: PanelCorrectHitEffectShapeOption[] } } = {
    "normal": {
      shapes: [
        { radius: 1.10, color: 0xffffff, lineWidth: 4 }
      ]
    },
    "best": {
      shapes: [
        { radius: 1.10, color: 0xff0000, lineWidth: 4 },
        { radius: 1.20, color: 0xfff100, lineWidth: 6 },
        { radius: 1.40, color: 0xA757A8, lineWidth: 8 },
        { radius: 1.80, color: 0xffffff, lineWidth: 10 }
      ]
    }
  };

  private animationManager: AnimationManager<PanelGameoverEffect, GameoverKind>;

  constructor(type: GameoverKind, x: number, y: number, radius: number) {
    super();
    this.position = { x, y };

    this.animationManager = new AnimationManager(this, PanelGameoverEffect.animations, type);
    PanelGameoverEffect.shapes[type].shapes.forEach(s => {
      this.addEgretDisplayObject(createCircleFrameShape(0, 0, radius * s.radius, s.color, s.lineWidth));
    });
  }

  onUpdate() {
    this.animationManager.update();
  }
}