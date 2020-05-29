type Scene = "loading" | "title" | "playing" | "gameover";

class TheGame {
  static readonly MAX_LEVEL: number = 50;
  static readonly FPS = 60;
  static readonly FRAMES_A_SESSION = FramesOf4thNote * 100;// TheGame.FRAMES_A_TURN * 16;
  static gameLayer: GameLayer;
  static uiLayer: UILayer;

  private static currentLevel_: number;
  private static elapsedFramesOfTurn;
  private static elapsedFramesOfSession;
  private static score_: number;
  private static bestScore_: number;
  private static bestRank_: number | undefined;
  /** -1 ミス中, 0: 1回成功, 1:コンボ１回目 */
  private static combo_: number;
  private static scene_: Scene;

  static get scene(): Scene {
    return this.scene_;
  }

  static async initFirst(mainLayer: eui.UILayer) {
    EgretGameObject.init(mainLayer.stage);
    TheGame.scene_ = "loading";
    TheGame.bestScore_ = 0;
    TheGame.bestRank_ = undefined;
    TheGame.currentLevel_ = 0;

    TheGame.gameLayer = new GameLayer();
    TheGame.uiLayer = new UILayer();

    egret.startTick(TheGame.tickLoop, TheGame);
    // await Social.init();
    TheGame.gotoTitle();
  }

  static gotoTitle() {
    console.log("TheGame title");
    TheGame.scene_ = "title";
    TheGame.currentLevel_ = 0;
    TheGame.score_ = 0;
    TheGame.gameLayer.panels.start();
    TheGame.uiLayer.score.visible = true;
  }

  static start() {
    console.log("TheGame start");
    TheGame.combo_ = -1;
    TheGame.currentLevel_ = 1;
    TheGame.elapsedFramesOfTurn = 0;
    TheGame.elapsedFramesOfSession = 0;
    TheGame.scene_ = "playing";
  }

  static get currentLevel(): [number, Level] {
    return [TheGame.currentLevel_, Levels[TheGame.currentLevel_]];
  }

  static gotoGameover() {
    TheGame.scene_ = "gameover";
    if (TheGame.bestScore_ < TheGame.score_) {
      TheGame.bestScore_ = TheGame.score_;
      Social.setScore(TheGame.bestScore_);
    }
    TheGame.gameLayer.panels.gameover();
    TheGame.uiLayer.score.visible = false;
    TheGame.uiLayer.resultOverlay.show();
  }


  static tickLoop(timeStamp: number): boolean {
    GameObject.update();
    const [, level] = TheGame.currentLevel;
    switch (TheGame.scene_) {
      case "loading":
        break;
      case "title":
        break;
      case "playing":
        TheGame.elapsedFramesOfSession += 1;
        TheGame.elapsedFramesOfTurn += 1;
        if (level.framesOfTurn < TheGame.elapsedFramesOfTurn) {
          console.log("TIME OVER");
          TheGame.miss();
        }
        if (TheGame.FRAMES_A_SESSION < TheGame.elapsedFramesOfSession) {
          TheGame.gotoGameover();
        }
        break;
      case "gameover":
        break;
    }

    return false;
  }

  static get remaingMiliseconds(): number {
    return (TheGame.FRAMES_A_SESSION - TheGame.elapsedFramesOfSession) / TheGame.FPS;
  }

  // 100才と365日がMAX 0才と1日が最小  
  static get resultAge(): { year: number, days: number } {
    const MAX_SCORE = 101 * 365;
    const score = TheGame.score;
    const rscore = MAX_SCORE - score;
    const year = Math.floor(rscore / 365);
    const days = rscore % 365;
    console.log("*********", MAX_SCORE, score, rscore, year, days);
    return { year, days };
  }

  static setBest(best: { bestScore: number, bestRank: number }) {
    this.bestRank_ = best.bestRank;
    this.bestScore_ = best.bestScore;
  }

  static get bestScore(): number {
    return this.bestScore_;
  }

  static get score(): number {
    return this.score_;
  }

  static get bestRank(): number {
    return this.bestRank_;
  }

  static get currentComboType(): ComboType {
    return comboType(TheGame.combo_);
  }

  static gotCorrectPanel(touched: Panel) {
    if (TheGame.scene !== "playing") {
      TheGame.start();
    }
    let plus = TheGame.currentLevel_;
    TheGame.combo_++;
    if (1 < TheGame.combo_) {
      plus *= TheGame.combo_;
    }
    TheGame.score_ += plus;
    // new EffectLabel(touched.compornent.x, touched.compornent.y,touched.compornent.width,touched.compornent.height,0x00ff00,TheGame.combo.toString() + " COMBO")

    TheGame.currentLevel_ = Math.min((TheGame.currentLevel_ + 1), TheGame.MAX_LEVEL);
    TheGame.nextTurn();
  }

  static gotWrongPanel(touched: Panel) {
    // new EffectLabel(touched.compornent.x, touched.compornent.y,touched.compornent.width,touched.compornent.height,0x000000,"MISS..")
    TheGame.miss();
  }

  private static miss() {
    if (TheGame.scene_ !== "playing") {
      return;
    }
    TheGame.combo_ = -1;
    TheGame.currentLevel_ = Math.max((TheGame.currentLevel_ - 1), 1);
    TheGame.nextTurn();
  }

  private static nextTurn() {
    console.log("TheGame nextTurn");
    TheGame.elapsedFramesOfTurn = 0;
    TheGame.gameLayer.panels.nextPanels();
  }

}
