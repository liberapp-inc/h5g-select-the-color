type ResultOverlayState = "off" | "in" | "roulette" | "on" | "out";
class ResultOverlay extends EgretGameObject {
  private am: AnimationManager<ResultOverlay, ResultOverlayState>;
  private result: { year: number, days: number };
  private yearOfAge: eui.Label;
  private daysOfAge: eui.Label;
  private score: eui.Label;
  private bestScore: eui.Label;
  private tapToStart: eui.Label;

  constructor() {
    super(false);

    this.am = new AnimationManager<ResultOverlay, ResultOverlayState>(this, {
      "off": { frames: -1 },
      "in": {
        frames: FramesOf4thNote * 1,
        alphas: easeOut(0, 0.7),
        onStart(o) {
          o.result = TheGame.resultAge;
          o.visible = true;
          o.enableTouch();
          setLabelText(o.score, comma(TheGame.score));
          setLabelText(o.bestScore, `BEST ${comma(TheGame.bestScore)}`);
          o.tapToStart.visible = false;
        },
        onFrame(o) {
          o.roulette();
        },
        onComplete(o, {}) {
          o.am.next("roulette");
        }
      },
      "roulette": {
        frames: FramesOf4thNote * 1,
        onFrame(o) {
          o.roulette();
        },
        onComplete(o, {}) {
          o.am.next("on");
        }
      },
      "on": {
        frames: -1,
        onStart(o) {
          setLabelText(o.yearOfAge, `${o.result.year}`);
          setLabelText(o.daysOfAge, `${o.result.days}`);
          o.tapToStart.visible = true;
        },
        onFrame(o, {counter, animation}) {
          o.tapToStart.alpha = lfo(0.9, 0.1, FramesOf4thNote * 8)(counter, animation.frames);
          o.tapToStart.scaleX = o.tapToStart.scaleY = lfo(1.1, 0.05, FramesOf4thNote * 4)(counter, animation.frames);
        }
      },
      "out": {
        frames: FramesOf16thNote,
        alphas: easeOut(1, 0),
        onComplete(o) {
          o.visible = false;
          o.disableTouch();
          o.am.next("off");
          TheGame.gotoTitle();
        }
      }
    }, "off");

    const shape: egret.Shape = createRectShape(0, 0, this.stageWidth, this.stageHeight, ColorPallet.GAMEOVER_BACKGROUND, 0);
    this.addEgretDisplayObject(shape);

    const yearOfAge = createLabel(" ", { type: "stage", valign: "center", halign: "center" }, 240, ColorPallet.RESULT_TEXT_COLOR, true);
    this.addEgretDisplayObject(this.yearOfAge = yearOfAge);

    const years = createLabel("才", { type: "next-below", align: "center", anchor: yearOfAge, offsetY: -30 }, 40, ColorPallet.RESULT_TEXT_COLOR);
    this.addEgretDisplayObject(years);

    const daysOfAge = createLabel(" ", { type: "next-below", align: "center", anchor: years, offsetY: 30 }, 120, ColorPallet.RESULT_TEXT_COLOR, true);
    this.addEgretDisplayObject(this.daysOfAge = daysOfAge);

    const days = createLabel("日", { type: "next-below", align: "center", anchor: daysOfAge, offsetY: -5 }, 40, ColorPallet.RESULT_TEXT_COLOR);
    this.addEgretDisplayObject(days);

    const label = createLabel("眼年齢", { type: "next-above", align: "center", anchor: yearOfAge, offsetY: -30 }, 40, ColorPallet.RESULT_TEXT_COLOR, true);
    this.addEgretDisplayObject(label);


    const score = createLabel(" ", { type: "stage", halign: "center", valign: "top", offsetY: 50 }, 120, ColorPallet.RESULT_TEXT_COLOR, true);
    this.addEgretDisplayObject(this.score = score);

    const best = createLabel(" ", { type: "next-below", anchor: score, align: "center", offsetY: 10 }, 40, ColorPallet.RESULT_TEXT_COLOR, true);
    this.addEgretDisplayObject(this.bestScore = best);

    this.tapToStart = createLabel("タップする", { type: "stage", valign: "bottom", halign: "center", offsetY: -60 }, 60, ColorPallet.RESULT_TEXT_COLOR, true);
    this.addEgretDisplayObject(this.tapToStart);
  }

  private roulette() {
    setLabelText(this.yearOfAge, Math.floor(Math.random() * 100 + 1).toString());
    setLabelText(this.daysOfAge, Math.floor(Math.random() * 365 + 1).toString());
  }

  show() {
    this.am.next("in");
  }

  protected onTapped() {
    if (this.am.state !== "on") {
      return;
    }
    this.am.next("out");
  }

  onUpdate() {
    this.am.update();
  }
}
