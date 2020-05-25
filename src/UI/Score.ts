class Score extends EgretGameObject {
  text: eui.Label = null;
  textBest: eui.Label = null;

  constructor(
  ) {
    super();
    this.rect = { x: 10, y: 10, width: 0, height: 0 };

    this.text = createLabel(
      0,
      0,
      "",
      80,
      0.5,
      ColorPallet.UI_TEXT,
      true
    );
    this.addEgretDisplayObject(this.text);

    this.textBest = createLabel(
      0,
      this.text.y + 50,
      "",
      80,
      0.5,
      ColorPallet.UI_TEXT,
      true
    );
    this.addEgretDisplayObject(this.textBest);
  }

  addDestroyMethod() {
    super.addDestroyMethod();
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
