class Main extends eui.UILayer {
  static I: Main;

  public constructor() {
    super();
    Main.I = this;
    this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
  }

  private async addToStage() {
    await TheGame.initFirst(this);
  }
}