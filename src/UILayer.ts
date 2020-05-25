class UILayer extends EgretLayerGameObject {
  score: Score;
  description: Description;
  timelimit: TimeLimit;

  constructor() {
    super();
    this.addChild(this.score = new Score());
    this.addChild(this.description = new Description());
    this.addChild(this.timelimit = new TimeLimit());
  }
}