class TimeLimit extends UICompornent {
  private timeText: eui.Label = null;
  private textColor: number = 0x000000;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: number
  ) {
    super(x, y, width, height);
    this.textColor = color;
    this.setText();
  }

  private setText() {
    this.timeText = Util.myText(
      TheGame.width / 2,
      0,
      "",
      80,
      0.5,
      this.textColor,
      true
    );
    this.timeText.anchorOffsetX = this.timeText.width / 2;
    this.compornent.addChild(this.timeText);
  }

  addDestroyMethod() {
    if (this.compornent) {
      this.compornent.removeChildren();
      this.compornent = null;
    }
    this.timeText = null;
  }

  updateContent() {
    this.timeText.text = "TIME : " + TheGame.remaingMiliseconds.toFixed(1);
  }
}
