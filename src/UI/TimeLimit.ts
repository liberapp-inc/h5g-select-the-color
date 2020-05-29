class TimeLimit extends EgretGameObject {
  private timeText: eui.Label = null;

  constructor(
  ) {
    super(false);
    this.timeText = createLabelOld(
      this.stageWidth / 2,
      0,
      "",
      80,
      0.5,
      ColorPallet.UI_TEXT,
      true
    );
    this.timeText.anchorOffsetX = this.timeText.width / 2;
    this.addEgretDisplayObject(this.timeText);
  }

  onUpdate() {
    this.timeText.text = "TIME : " + TheGame.remaingMiliseconds.toFixed(1);
  }
}
