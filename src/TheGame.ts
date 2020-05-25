class TheGame {
  static width: number;
  static height: number;

  static async initFirst(mainLayer: eui.UILayer) {
    Util.init(mainLayer);
    GameObject.init(mainLayer.stage);

    TheGame.reinit();

    egret.startTick(TheGame.tickLoop, TheGame);
  }

  static async reinit() {
    this.width = egret.MainContext.instance.stage.stageWidth;
    this.height = egret.MainContext.instance.stage.stageHeight;
    GameOver.gameOverFlag = false;
    new Background();
    new GameStage();
    new UILayer();
    new Score(0, 0, 0, 0, ColorPallet.UI_TEXT);
    new Description(0, 0, 0, 0, ColorPallet.UI_TEXT);
    await Social.init();
    new CreateGameScene();
  }

  static tickLoop(timeStamp: number): boolean {
    GameObject.update();
    return false;
  }
}
