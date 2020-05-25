class RetryButtonInPlaying extends Button {
  constructor() {
    super(
      {
        x: EgretGameObject.stageWidth - EgretGameObject.stageWidth * 0.26,
        y: EgretGameObject.stageWidth * 0.16,
        width: EgretGameObject.stageWidth * 0.26,
        height: EgretGameObject.stageWidth * 0.12
      },
      60,
      0.5,
      ColorPallet.BUTTON_LABEL,
      ColorPallet.BUTTON_BACKGROUND,
      "リトライ",
      false);
  }

  onTapped() {
    // TheGame.retry();
  }

  updateContent() { }
}
