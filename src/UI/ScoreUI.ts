class ScoreUI extends EgretGameObject {
  private score: eui.Label = null;
  private best: eui.Label = null;

  constructor() {
    super(true);
    this.position = { x: 0, y: 0 };

    this.score = createLabel("", { type: "stage", halign: "center", valign: "top", offsetY: 20 }, 180, ColorPallet.RESULT_TEXT_COLOR, true);
    this.addEgretDisplayObject(this.score);

    this.best = createLabel("", { type: "next-below", anchor: this.score, align: "center", offsetY: 0 }, 30, ColorPallet.RESULT_TEXT_COLOR, true);
    this.addEgretDisplayObject(this.best);
  }

  onDestroy() {
    this.score = undefined;
    this.best = undefined;
    super.onDestroy();
  }

  onUpdate() {
    setLabelText(this.score, comma(TheGame.score));
    let best;
    if (TheGame.player && TheGame.player.bestRank) {
      best = `BEST ${comma(TheGame.player.bestScore)} ${comma(TheGame.player.bestRank)}位`;
    } else {
      best = `BEST 0`;
    }
    setLabelText(this.best, best);
  }
}
