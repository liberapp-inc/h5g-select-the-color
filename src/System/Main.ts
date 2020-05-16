enum ColorPallet {
  //自然
  WHITE = 0xffffff,
  RED = 0xf16b6f,
  BLUE = 0x80bd9e,
  GREEN = 0x89da59,
  VERMILION = 0xf98866,
  BLACK = 0x222222,
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
    new Score(0, 0, 0, 0, ColorPallet.BLACK);
    new Description(0, 0, 0, 0, ColorPallet.BLACK);
    await Social.init();
    new CreateGameScene();
  }
}
