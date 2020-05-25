class GameOver extends EgretGameObject {
  private textGameOver: eui.Label = null;
  private textScore: eui.Label = null;
  private result: Result;


  constructor() {
    super(false);

    const shape: egret.Shape = createRectShape(
      0,
      0,
      this.stageWidth,
      this.stageHeight,
      ColorPallet.GAMEOVER_BACKGROUND,
      0
    );
    this.addEgretDisplayObject(shape);
    shape.alpha = 0.5;

    this.textGameOver = createLabel(
      this.stageWidth / 2,
      this.stageHeight * 0.4,
      "あなたの目は…",
      80,
      0.5,
      ColorPallet.GAMEOVER_TEXT,
      true
    );
    this.textGameOver.anchorOffsetX = this.textGameOver.width / 2;
    this.textGameOver.anchorOffsetY = this.textGameOver.height / 2;
    this.addEgretDisplayObject(this.textGameOver);

    this.textScore = createLabel(
      this.stageWidth / 2,
      this.stageHeight * 0.2 + 50,
      "",
      80,
      1,
      ColorPallet.GAMEOVER_TEXT,
      true
    );
    this.textScore.anchorOffsetX = this.textScore.width / 2;
    this.textScore.anchorOffsetY = this.textScore.height / 2;
    this.addEgretDisplayObject(this.textScore);

    this.addChild(new Result());
  }

  addDestroyMethod() {
    super.addDestroyMethod();
    this.textGameOver = null;
    this.textScore = null;
  }

  updateContent() { }
}
