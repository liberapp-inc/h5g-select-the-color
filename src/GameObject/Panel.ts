

type PanelAnimationStatus = "waiting" | "in" | "on" | "tap" | "out" | "out-miss" | "out-success" | "out-gameover" | "in-result" | "result";

class Panel extends EgretGameObject {
  private correctFlag: boolean = false;
  private color: number;
  private animationManager: AnimationManager<Panel, PanelAnimationStatus>;
  private radius: number;
  private level: TurnOption;

  constructor(level: TurnOption, p: { x, y }, rgb: RGB, correct: boolean, initialState: "waiting" | "in") {
    super();
    this.position = p;
    this.level = level;
    this.radius = 90;
    this.correctFlag = correct;
    const plusOrNegative: number = Math.floor(Math.random() * 2) === 0 ? 1 : -1;
    const colorDiff = plusOrNegative * level.depthColor;
    {
      let color: number;
      if (correct) {
        color = rgbToColor(rgb, colorDiff);
      } else {
        color = rgbToColor(rgb);
      }
      this.color = color;
      this.addEgretDisplayObject(createCircleShape(0, 0, this.radius, color));
    }

    {
      this.addEgretDisplayObject(createCircleShape(0, -this.radius + 16, 8, 0xffffff));
    }

    this.enableTouch();
    this.animationManager = new AnimationManager<Panel, PanelAnimationStatus>(this, Panel.animations, initialState);
  }


  onTapped() {
    if (TheGame.scene === "loading") {
      return;
    }
    if (["on", "waiting"].indexOf(this.animationManager.state) === -1) {
      return;
    }

    if (this.correctFlag) {
      TheGame.gotCorrectPanel(this);
      this.animationManager.next(["tap", "out-success"]);
    } else {
      if (TheGame.scene === "playing") {
        TheGame.gotWrongPanel(this);
        this.animationManager.next(["tap", "out-miss"]);
      } else {
        this.animationManager.next(["tap", "on"]);
      }
    }
  }

  onUpdate() {
    this.animationManager.update();
  }

  start() {
    this.animationManager.next("in");
  }

  out() {
    this.animationManager.next("out");
  }

  gameover() {
    this.animationManager.next("out-gameover");
  }


  private static animations: { [key: string]: Animation<Panel, PanelAnimationStatus> } = {
    waiting: {
      // 2拍毎にビートをウツ
      frames: FramesOf4thNote * 2,
      scales: adsr(0.95, 1.00, 2, 2, 0.97, FramesOf4thNote - 2, FramesOf4thNote),
      alphas: adsr(0.95, 1.00, 2, 2, 0.97, FramesOf4thNote - 2, FramesOf4thNote),
      onFrame: (object: Panel, { animation, longCounter }) => {
        object.rotation = longCounter * 360 / (FramesOf4thNote * 16);
      }
    },
    in: {
      frames: FramesOf8thNote,
      scales: [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 0.95, 1],
      onComplete: (object: Panel, {manager}) => {
        manager.next("on");
      },
    },
    on: {
      // 1拍毎にビートをウツ
      frames: FramesOf4thNote * 1,
      scales: adsr(0.95, 1.05, 2, 0, 1.05, 0, FramesOf4thNote),
      onFrame: (object: Panel, { animation, longCounter }) => {
        object.rotation = longCounter * 360 / object.level.framesOfTurn;
      }
    },
    tap: {
      /// タップアニメーション  :1/16音符で小さくなり大きくなる
      frames: FramesOf16thNote,
      scales: [1, 0.8, 0.85, 0.95, 1.05, 1.1, 1],
      onComplete: (object: Panel, {manager}) => {
        manager.popNext();
      }
    },
    out: {
      /// 消えるアニメーション  1/8音符で透明になって多くなり消える
      frames: FramesOf8thNote,
      alphas: [1, 0.95, 0.9, 0.85, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.199999999999999, 0.15, 0.1, 0.05, 0],
      scales: [1, 1.005, 1.01, 1.02, 1.03, 1.04, 1.08, 1.1, 1.1, 1.05, 1.75, 1.85, 1.9, 1.95, 2],
      onComplete: (object: Panel, {}) => {
        object.destroy();
      }
    },
    "out-success": {
      /// ミスして消えるアニメーション  小さくなる（途中でフェイント)
      frames: FramesOf8thNote,
      alphas: [1, 0.95, 0.9, 0.85, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.199999999999999, 0.15, 0.1, 0.05, 0],
      scales: [1, 1.005, 1.01, 1.02, 1.03, 1.04, 1.08, 1.1, 1.1, 1.05, 1.75, 1.85, 1.9, 1.95, 2],
      onStart: (object: Panel, {}) => {
        const {x, y} = object.position;
        const comboType = TheGame.currentComboType;
        TheGame.gameLayer.panels.addChild(new PanelCorrectHitEffect(comboType, x, y, object.radius, object.color));
      },
      onComplete: (object: Panel, {}) => {
        object.destroy();
      }
    },
    "out-miss": {
      /// ミスして消えるアニメーション  小さくなる（途中でフェイント)
      frames: FramesOf8thNote,
      scales: [1, 0.95, 0.9, 0.8, 0.7, 0.5, 0.4, 0.3, 0.4, 0.6, 0.5, 0.4, 0.2, 0.1, 0],
      onComplete: (object: Panel, {}) => {
        object.destroy();
      }
    },
    "out-gameover": {
      ///　4拍で、小さくなり、透明になり消える
      frames: FramesOf4thNote * 2,
      alphas: easeOut(1.0, 0),
      scales: easeOut(1.0, 0),
      onStart: (object: Panel, {}) => {
        const {x, y} = object.position;
        TheGame.gameLayer.panels.addChild(new PanelGameoverEffect("best", x, y, object.radius));
      },
      onComplete: (object: Panel, {manager}) => {
        manager.next("in-result");
      }
    },
    "in-result": {
      frames: FramesOf8thNote,
      scales: [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 0.95, 1],
      onStart(object: Panel) {
        object.alpha = 1;
      },
      onComplete: (object: Panel, {manager}) => {
        manager.next("result");
      },
    }, "result": {
      // 1拍毎にビートをウツ
      frames: FramesOf4thNote * 1,
      scales: adsr(0.95, 1.05, 2, 0, 1.05, 0, FramesOf4thNote),
      onFrame: (object: Panel, { animation, longCounter }) => {
        object.rotation = longCounter * 360 / (FramesOf4thNote * 16);
      }
    },
  };

}

