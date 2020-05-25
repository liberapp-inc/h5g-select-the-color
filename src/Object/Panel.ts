class Panel extends EgretGameObject {
  private correctFlag: boolean = false;
  private animationCounter: number;

  constructor(rect: Rect, rgb: RGB, correct: boolean) {
    super();
    this.rect = rect;
    const radius = rect.width / 2;
    this.correctFlag = correct;
    this.animationCounter = 0;
    const plusOrNegative: number = Math.floor(Math.random() * 2) === 0 ? 1 : -1;
    const colorDiff = plusOrNegative * (TheGame.MAX_LEVEL - TheGame.currentLevel);
    {
      let color: number;
      if (correct) {
        color = rgbToColor(rgb, colorDiff);
      } else {
        color = rgbToColor(rgb);
      }
      this.addEgretDisplayObject(createCircleShape(0, 0, radius, color));
    }

    {
      const needleColor = rgbToColor(rgb, -colorDiff);
      const needle = new egret.Shape();
      needle.graphics.lineStyle(2, needleColor);
      needle.graphics.moveTo(0, 0);
      needle.graphics.lineTo(0, radius);
      this.addEgretDisplayObject(needle);
    }

    // this.anchorOffsetX += radius;
    // this.anchorOffsetY += radius;

    this.enableTouch();
  }


  touch() {
    if (TheGame.gameOverFlag) {
      return;
    }
    if (!TheGame.inited) {
      return;
    }
    if (this.correctFlag) {
      TheGame.gotCorrectPanel(this);
    }
    else {
      TheGame.gotWrongPanel(this);
    }
  }

  /// 60FPS 120BPM
  private static ANIMATION_TABLE = [
    0.004, 0.024, 0.044, 0.042, 0.04, 0.038, 0.036, 0.034, 0.032, 0.03, 0.028, 0.026, 0.024, 0.022, 0.02, 0.018, 0.016, 0.014, 0.012, 0.01, 0.009, 0.008, 0.007, 0.00599999999999999, 0.005, 0.004, 0.003, 0.002, 0.001, 0,
    0.004, 0.024, 0.044, 0.042, 0.04, 0.038, 0.036, 0.034, 0.032, 0.03, 0.028, 0.026, 0.024, 0.022, 0.02, 0.018, 0.016, 0.014, 0.012, 0.01, 0.009, 0.008, 0.007, 0.00599999999999999, 0.005, 0.004, 0.003, 0.002, 0.001, 0,
    0.004, 0.024, 0.044, 0.042, 0.04, 0.038, 0.036, 0.034, 0.032, 0.03, 0.028, 0.026, 0.024, 0.022, 0.02, 0.018, 0.016, 0.014, 0.012, 0.01, 0.009, 0.008, 0.007, 0.00599999999999999, 0.005, 0.004, 0.003, 0.002, 0.001, 0,
    0.004, 0.024, 0.044, 0.042, 0.04, 0.038, 0.036, 0.034, 0.032, 0.03, 0.028, 0.026, 0.024, 0.022, 0.02, 0.018, 0.016, 0.014, 0.012, 0.01, 0.009, 0.008, 0.007, 0.00599999999999999, 0.005, 0.004, 0.003, 0.002, 0.001, 0,
    0.004, 0.024, 0.044, 0.042, 0.04, 0.038, 0.036, 0.034, 0.032, 0.03, 0.028, 0.026, 0.024, 0.022, 0.02, 0.018, 0.016, 0.014, 0.012, 0.01, 0.009, 0.008, 0.007, 0.00599999999999999, 0.005, 0.004, 0.003, 0.002, 0.001, 0,
    0.004, 0.024, 0.044, 0.042, 0.04, 0.038, 0.036, 0.034, 0.032, 0.03, 0.028, 0.026, 0.024, 0.022, 0.02, 0.018, 0.016, 0.014, 0.012, 0.01, 0.009, 0.008, 0.007, 0.00599999999999999, 0.005, 0.004, 0.003, 0.002, 0.001, 0,
    0.004, 0.024, 0.044, 0.042, 0.04, 0.038, 0.036, 0.034, 0.032, 0.03, 0.028, 0.026, 0.024, 0.022, 0.02, 0.018, 0.016, 0.014, 0.012, 0.01, 0.009, 0.008, 0.007, 0.00599999999999999, 0.005, 0.004, 0.003, 0.002, 0.001, 0,
    0.004, 0.024, 0.044, 0.042, 0.04, 0.038, 0.036, 0.034, 0.032, 0.03, 0.028, 0.026, 0.024, 0.022, 0.02, 0.018, 0.016, 0.014, 0.012, 0.01, 0.009, 0.008, 0.007, 0.00599999999999999, 0.005, 0.004, 0.003, 0.002, 0.001, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];
  updateContent() {
    const t = Panel.ANIMATION_TABLE;
    const e = 0.95 + t[this.animationCounter % t.length];
    this.scaleX = e;
    this.scaleY = e;
    this.rotation = this.animationCounter * 360 / TheGame.FRAMES_A_TURN;
    this.animationCounter += 1;
  }
}
