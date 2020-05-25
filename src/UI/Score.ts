class Score extends UICompornent {
  static I: Score = null; // singleton instance
  text: eui.Label = null;
  textBest: eui.Label = null;
  textColor: number = 0x000000;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: number
  ) {
    super(x, y, width, height);
    Score.I = this;
    this.textColor = color;
    this.createChildren();
  }

  createChildren() {
    this.text = Util.myText(
      0,
      0,
      "",
      80,
      0.5,
      this.textColor,
      true
    );
    this.compornent.addChild(this.text);

    this.textBest = Util.myText(
      0,
      this.text.y + 50,
      "",
      80,
      0.5,
      this.textColor,
      true
    );
    this.compornent.addChild(this.textBest);
  }

  addDestroyMethod() {
    if (this.compornent) {
      this.compornent.removeChildren();
      this.compornent = null;
    }
    this.text = null;
    this.textBest = null;
  }

  updateContent() {
    this.text.text = `SCORE: ${TheGame.score}`;
    if (TheGame.bestRank) {
      this.textBest.text = `BEST: ${TheGame.bestScore}/${TheGame.bestRank}位`;
    } else {
      this.textBest.text = `BEST: ${TheGame.bestScore}/-位`;
    }
  }
}
