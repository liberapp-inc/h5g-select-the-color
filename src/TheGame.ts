type Scene = "loading" | "title" | "playing" | "gameover";

class TheGame {
  static readonly MAX_LEVEL: number = 50;
  static readonly FPS = 60;
  static readonly FRAMES_A_SESSION = FramesOf4thNote * 100;// TheGame.FRAMES_A_TURN * 16;
  static gameLayer: GameLayer;
  static uiLayer: UILayer;

  private static currentTurn_: number;
  private static elapsedFramesOfTurn;
  private static elapsedFramesOfSession;
  private static score_: number;
  private static player_: Player;
  private static lastResult_: Result;

  /** -1 ミス中, 0: 1回成功, 1:コンボ１回目 */
  private static combo_: number;
  private static scene_: Scene;

  static get scene(): Scene {
    return this.scene_;
  }

  static async initFirst(mainLayer: eui.UILayer) {
    EgretGameObject.init(mainLayer.stage);
    TheGame.scene_ = "loading";
    TheGame.score_ = 0;
    TheGame.player_ = undefined;
    TheGame.currentTurn_ = 0;

    TheGame.gameLayer = new GameLayer();
    TheGame.uiLayer = new UILayer();

    egret.startTick(TheGame.tickLoop, TheGame);
    TheGame.player_ = await Social.init(false);
    TheGame.gotoTitle();
  }

  static gotoTitle() {
    console.log("TheGame title");
    TheGame.scene_ = "title";
    TheGame.currentTurn_ = 0;
    TheGame.score_ = 0;
    TheGame.gameLayer.panels.start();
    TheGame.uiLayer.score.visible = true;
    TheGame.uiLayer.description.visible = true;
  }

  static start() {
    console.log("TheGame start");
    TheGame.uiLayer.score.visible = true;
    TheGame.uiLayer.description.visible = false;
    TheGame.combo_ = -1;
    TheGame.currentTurn_ = 1;
    TheGame.elapsedFramesOfTurn = 0;
    TheGame.elapsedFramesOfSession = 0;
    TheGame.scene_ = "playing";
  }

  static get currentTurn(): [number, TurnOption] {
    return [TheGame.currentTurn_, TurnOptions[TheGame.currentTurn_]];
  }

  static gotoResult() {
    TheGame.scene_ = "gameover";
    const player = TheGame.player;

    const result = {
      commulativeExp: {
        from: player.commulativeExp,
        to: player.commulativeExp += StageOptions[player.stage - 1].expToEarn,
      },
      commulativeScore: {
        from: player.commulativeScore,
        to: player.commulativeScore += TheGame.score_,
      },
      isLevelUped: false,
      isStageUped: false,
    };

    if (LevelOptions[player.level].expThreshold <= player.commulativeExp) {
      console.log("LEVELUP");
      player.level += (player.level + 1) % LevelOptions.length;
      result.isLevelUped = true;
    }

    if (StageOptions[player.stage - 1].scoreThreshold <= player.commulativeScore) {
      console.log("NEXT STAGE");
      player.stage = (player.stage + 1) % StageOptions.length;
      result.isStageUped = true;
    }
    Social.updateData(player);

    if (player.bestScore < TheGame.score_) {
      console.log("HIGH SCORE");
      Social.setScore(TheGame.score_).then((r) => {
        if (r) {
          const { bestScore, bestRank } = r;
          player.bestScore = bestScore;
          player.bestRank = bestRank;
        }
      });
    }
    const MAX_SCORE = 101 * 365;
    const score = TheGame.score;
    const rscore = MAX_SCORE - score;
    const years = Math.floor(rscore / 365);
    const days = rscore % 365;
    this.lastResult_ = {
      ...result,
      stage: TheGame.player_.stage,
      level: TheGame.player_.level,
      years,
      days
    }

    console.log("LastResult", this.lastResult_);

    TheGame.gameLayer.panels.gameover();
    TheGame.uiLayer.score.visible = false;
    TheGame.uiLayer.resultOverlay.show();
  }


  static tickLoop(timeStamp: number): boolean {
    GameObject.update();
    const [, level] = TheGame.currentTurn;
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
          TheGame.gotoResult();
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

  static get lastResult(): Result {
    return TheGame.lastResult_;
  }

  static get player(): Player | undefined {
    return this.player_;
  }

  static get score(): number {
    return this.score_;
  }

  static get currentComboType(): ComboType {
    return comboType(TheGame.combo_);
  }

  static gotCorrectPanel(touched: Panel) {
    if (TheGame.scene !== "playing") {
      TheGame.start();
    }
    let plus = TheGame.currentTurn_;
    TheGame.combo_++;
    if (1 < TheGame.combo_) {
      plus *= TheGame.combo_;
    }
    TheGame.score_ += plus;
    // new EffectLabel(touched.compornent.x, touched.compornent.y,touched.compornent.width,touched.compornent.height,0x00ff00,TheGame.combo.toString() + " COMBO")

    TheGame.currentTurn_ = Math.min((TheGame.currentTurn_ + 1), TheGame.MAX_LEVEL);
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
    TheGame.currentTurn_ = Math.max((TheGame.currentTurn_ - 1), 1);
    TheGame.nextTurn();
  }

  private static nextTurn() {
    console.log("TheGame nextTurn");
    TheGame.elapsedFramesOfTurn = 0;
    TheGame.gameLayer.panels.nextPanels();
  }

}
