class RetryButtonOnGameOver extends Button {
  constructor() {
    super(
      {
        x: (EgretGameObject.stageWidth - EgretGameObject.stageWidth * 0.4) / 2,
        y: EgretGameObject.stageHeight * 0.6,
        width: EgretGameObject.stageWidth * 0.4,
        height: EgretGameObject.stageWidth * 0.18
      }
      ,
      80,
      0.5,
      ColorPallet.BUTTON_LABEL,
      ColorPallet.BUTTON_BACKGROUND,
      "リトライ", false);
  }

  protected onTapped() {
    // GameObject.transit = TheGame.reinit;
  }

  updateContent() { }
}
