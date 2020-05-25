interface ResultType {
  scoreMin: number, scoreMax: number,
  comment: string;
}

const ResultData: ResultType[] = [
  { scoreMin: Number.NEGATIVE_INFINITY, scoreMax: 600, comment: "老眼です" },
  { scoreMin: 600, scoreMax: 800, comment: "やや老眼" },
  { scoreMin: 800, scoreMax: 1000, comment: "老眼ではありません" },
  { scoreMin: 1000, scoreMax: 1200, comment: "クリアな視界" },
  { scoreMin: 1200, scoreMax: Number.POSITIVE_INFINITY, comment: "精密機械" }
];

class Result extends EgretGameObject {
  private text: eui.Label = null;
  private animation: number;
  private score: number = 0;
  private comentNumber: number = 0;
  private rouletting = true;


  constructor() {
    super(false);
    this.rect = { x: 0, y: 0, width: 0, height: 0 };
    this.animation = 0;
    this.score = TheGame.score;
    this.text = createLabel(this.stageWidth / 2, this.stageHeight * 0.5, "", 120, 0.5, ColorPallet.RESULT_TEXT_COLOR, true);
    this.text.anchorOffsetX = this.text.width / 2;
    this.text.anchorOffsetY = this.text.height / 2;
    this.addEgretDisplayObject(this.text);
  }

  addDestroyMethod() {
    super.addDestroyMethod();
    this.text = null;
  }

  updateContent() {
    if (!this.rouletting) {
      return;
    }
    if (120 < this.animation) {
      const s = ResultData[this.animation % ResultData.length];
      if (s.scoreMin <= this.score && this.score < s.scoreMax) {
        this.text.text = s.comment;
        this.text.anchorOffsetX = this.text.width / 2;
        this.text.anchorOffsetY = this.text.height / 2;
        // RetryButton.create();
        this.rouletting = false;
        return;
      }
    }
    this.animation++;
  }
}