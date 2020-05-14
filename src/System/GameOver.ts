class GameOver extends UICompornent {
  static I: GameOver = null;
  textGameOver: eui.Label = null;
  textScore: eui.Label = null;
  textColor: number = ColorPallet.BLACK;
  static gameOverFlag: boolean = false;

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height);
    GameOver.I = this;
    GameOver.gameOverFlag = true;
    Score.I.gameOver();
    this.setShape();
    this.setText();
    new Result(0, 0, 0, 0, ColorPallet.BLACK);
  }

  setShape() {
    const shape: egret.Shape = Util.setRect(
      0,
      0,
      Game.width,
      Game.height,
      ColorPallet.WHITE,
      0,
      true
    );
    this.compornent.addChild(shape);
    shape.alpha = 0.5;
    this.shapes.push(shape);
  }

  setText() {
    this.textGameOver = Util.myText(
      Game.width / 2,
      Game.height * 0.4,
      "あなたの目は…",
      80,
      0.5,
      this.textColor,
      true
    );
    this.textGameOver.anchorOffsetX = this.textGameOver.width / 2;
    this.textGameOver.anchorOffsetY = this.textGameOver.height / 2;
    this.compornent.addChild(this.textGameOver);

    this.textScore = Util.myText(
      Game.width / 2,
      Game.height * 0.2 + 50,
      "",
      80,
      1,
      this.textColor,
      true
    );
    this.textScore.anchorOffsetX = this.textScore.width / 2;
    this.textScore.anchorOffsetY = this.textScore.height / 2;
    this.compornent.addChild(this.textScore);
  }

  addDestroyMethod() {
    if (this.compornent) {
      this.compornent.removeChildren();
    }

    this.textGameOver = null;
    this.textScore = null;
    this.shapes = [];
  }

  updateContent() {}

  static tap() {
    UILayer.I.remove();
    GameObject.transit = Game.init;
  }
}
