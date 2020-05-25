enum ColorPallet {
  BACKGROUND = 0x333333,
  BUTTON_LABEL = 0xeeeeee,
  BUTTON_BACKGROUND = 0x333333,
  GAMEOVER_BACKGROUND = 0xeeeeee,
  GAMEOVER_TEXT = 0x333333,
  UI_TEXT = 0xeeeeee,
  RESULT_TEXT_COLOR = 0xeeeeee,
}

class Main extends eui.UILayer {
  static I: Main;

  public constructor() {
    super();
    Main.I = this;
    this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
  }

  private async addToStage() {

    Util.init(this);
    GameObject.init(this.stage);

    await Game.init();
    egret.startTick(this.tickLoop, this);
  }

  tickLoop(timeStamp: number): boolean {
    GameObject.update();
    return false;
  }
}

class Game {
  static width: number;
  static height: number;

  static async init() {
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
}
