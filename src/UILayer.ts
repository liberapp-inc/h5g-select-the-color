class UILayer extends EgretLayerGameObject {
  resultOverlay: ResultOverlay;
  score: ScoreUI;
  description: Description;
  timelimit: TimeLimit;


  constructor() {
    super();
    this.addChild(this.score = new ScoreUI());
    this.addChild(this.description = new Description());
    this.addChild(this.timelimit = new TimeLimit());
    this.addChild(this.resultOverlay = new ResultOverlay());
  }

  onUpdate() { }
}