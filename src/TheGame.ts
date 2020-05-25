class TheGame {
  static MAX_LEVEL: number = 50;
  static FPS = 60;
  static FRAMES_A_TURN = 2 * TheGame.FPS;
  static FRAMES_A_SESSION = 8 * TheGame.FPS;

  static currentLevel: number = 1;
  static elapsedFramesOfTurn = 0;
  static elapsedFramesOfSession = 0;
  static startFlag: boolean = false;
  static gameOverFlag: boolean = false;
  static inited = false;
  static score: number = 0;
  static bestScore: number = 0;
  static bestRank: number | undefined;
  static combo: number = 0;
  static comboFlag: boolean = false;
  static gameLayer: EgretGameObject;
  static uiLayer: EgretGameObject;
  static panels: Panels;

  static async initFirst(mainLayer: eui.UILayer) {
    EgretGameObject.init(mainLayer.stage);

    TheGame.gameLayer = new GameLayer();
    TheGame.uiLayer = new UILayer();
    egret.startTick(TheGame.tickLoop, TheGame);
    // await Social.init();
    TheGame.inited = true;
  }

  static reset() {
    TheGame.panels.createPanels(3, 4);
  }
  static start() {
    TheGame.score = 0;
    TheGame.combo = 0;
    TheGame.comboFlag = false;
    TheGame.currentLevel = 1;
    TheGame.elapsedFramesOfTurn = 0;
    TheGame.elapsedFramesOfSession = 0;
    TheGame.startFlag = true;
    TheGame.gameOverFlag = false;
    TheGame.nextTurn();
  }

  static retry() {
    GameObject.transit = TheGame.reset;
  }

  static tickLoop(timeStamp: number): boolean {
    GameObject.update();
    TheGame.elapsedFramesOfSession += 1;
    if (TheGame.startFlag) {
      TheGame.elapsedFramesOfTurn += 1;
      if (TheGame.FRAMES_A_TURN < TheGame.elapsedFramesOfTurn) {
        console.log("TIME OVER");
        TheGame.miss();
      }
      if (TheGame.FRAMES_A_SESSION < TheGame.elapsedFramesOfSession) {
        TheGame.gameover();
      }
    }

    return false;
  }

  static get remaingMiliseconds(): number {
    return (TheGame.FRAMES_A_SESSION - TheGame.elapsedFramesOfSession) / TheGame.FPS;
  }

  static gameover() {
    if (TheGame.gameOverFlag) {
      return;
    }
    TheGame.gameOverFlag = true;
    if (TheGame.bestScore < TheGame.score) {
      TheGame.bestScore = TheGame.score;
      Social.setScore(TheGame.bestScore);
    }

    TheGame.uiLayer.addChild(new GameOver());
  }

  static gotCorrectPanel(touched: Panel) {
    if (TheGame.startFlag) {
      TheGame.score += 1;
      if (TheGame.comboFlag) {
        TheGame.score += this.combo;
        TheGame.combo++;
      } else {
        TheGame.comboFlag = true;
        TheGame.combo = 1;
      }
      // new EffectLabel(touched.compornent.x, touched.compornent.y,touched.compornent.width,touched.compornent.height,0x00ff00,TheGame.combo.toString() + " COMBO")
      // MyTween.touchCorrectPanel(touched.compornent, touched.mask);
      TheGame.currentLevel = Math.min((TheGame.currentLevel + 1), TheGame.MAX_LEVEL);
      TheGame.nextTurn();
    } else {
      TheGame.start();
    }
  }

  static miss() {
    TheGame.comboFlag = false;
    TheGame.combo = 0;
    TheGame.currentLevel = Math.max((TheGame.currentLevel - 1), 1);
    TheGame.nextTurn();
  }

  static nextTurn() {
    TheGame.elapsedFramesOfTurn = 0;
    TheGame.panels.createPanels(3, 4);
  }

  static gotWrongPanel(touched: Panel) {
    // new EffectLabel(touched.compornent.x, touched.compornent.y,touched.compornent.width,touched.compornent.height,0x000000,"MISS..")
    // MyTween.touchMissPanel(touched.compornent, touched.mask);
    TheGame.miss();
  }

}
