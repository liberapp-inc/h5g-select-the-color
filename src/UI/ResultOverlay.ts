type ResultOverlayState = "off" | "in" | "roulette" | "on" | "out";


class ResultOverlay extends EgretGameObject {
  private static animatioins: { [key: string]: Animation<ResultOverlay, ResultOverlayState> } = {
    "off": { frames: -1 },
    "in": {
      frames: FramesOf4thNote * 1,
      alphas: easeOut(0, 0.7),
      onStart(o) {
        o.result = TheGame.lastResult;
        setLabelText(o.level, `${o.result.level}`);
        setLabelText(o.stage, `${o.result.stage}`);
        o.visible = true;
        o.enableTouch();
        o.tapToStart.visible = false;
      },
      onFrame(o, {counter}) {
        o.roulette(counter);
      },
      onComplete(o, {}) {
        o.am.next("roulette");
      }
    },
    "roulette": {
      frames: FramesOf4thNote * 1,
      onFrame(o, {counter}) {
        o.roulette(counter + ResultOverlay.animatioins["in"].frames);
      },
      onComplete(o, {}) {
        o.am.next("on");
      }
    },
    "on": {
      frames: -1,
      onStart(o) {
        setLabelText(o.yearOfAge, `${o.result.years}`);
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
  };
  private am: AnimationManager<ResultOverlay, ResultOverlayState>;
  private result: Result;
  private yearOfAge: eui.Label;
  private daysOfAge: eui.Label;
  private level: eui.Label;
  private commulativeExp: eui.Label;
  private stage: eui.Label;
  private commulativeScore: eui.Label;
  private tapToStart: eui.Label;

  constructor() {
    super(false);

    this.am = new AnimationManager<ResultOverlay, ResultOverlayState>(this, ResultOverlay.animatioins, "off");

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

    const levelLabel = createLabel("LV", { type: "stage", halign: "left", valign: "top", offsetX: 40, offsetY: 20 }, 20, ColorPallet.RESULT_TEXT_COLOR, true);
    this.addEgretDisplayObject(levelLabel);
    this.level = createLabel("99", { type: "stage", halign: "left", valign: "top", offsetX: 40, offsetY: 60 }, 100, ColorPallet.RESULT_TEXT_COLOR, true);
    this.addEgretDisplayObject(this.level);
    const expLabel = createLabel("EXP", { type: "stage", halign: "right", valign: "top", offsetX: -40, offsetY: 20 }, 20, ColorPallet.RESULT_TEXT_COLOR, true);
    this.addEgretDisplayObject(expLabel);
    this.commulativeExp = createLabel("9,999,999", { type: "stage", halign: "right", valign: "top", offsetX: -40, offsetY: 60 }, 100, ColorPallet.RESULT_TEXT_COLOR, true);
    this.addEgretDisplayObject(this.commulativeExp);

    const stageLevel = createLabel("ステージ", { type: "stage", halign: "left", valign: "top", offsetX: 40, offsetY: 200 }, 20, ColorPallet.RESULT_TEXT_COLOR, true);
    this.addEgretDisplayObject(stageLevel);
    this.stage = createLabel("9", { type: "stage", halign: "left", valign: "top", offsetX: 40, offsetY: 240 }, 100, ColorPallet.RESULT_TEXT_COLOR, true);
    this.addEgretDisplayObject(this.stage);
    const scoreLabel = createLabel("累計スコア", { type: "stage", halign: "right", valign: "top", offsetX: -40, offsetY: 200 }, 20, ColorPallet.RESULT_TEXT_COLOR, true);
    this.addEgretDisplayObject(scoreLabel);
    this.commulativeScore = createLabel("99,999,999", { type: "stage", halign: "right", valign: "top", offsetX: -40, offsetY: 240 }, 100, ColorPallet.RESULT_TEXT_COLOR, true);
    this.addEgretDisplayObject(this.commulativeScore);

    this.tapToStart = createLabel("タップする", { type: "stage", valign: "bottom", halign: "center", offsetY: -60 }, 60, ColorPallet.RESULT_TEXT_COLOR, true);
    this.addEgretDisplayObject(this.tapToStart);
  }

  private roulette(counter: number) {
    const frames = ResultOverlay.animatioins["in"].frames + ResultOverlay.animatioins["roulette"].frames;
    const r = this.result;

    const commulativeExp = Math.floor(easeOut(r.commulativeExp.from, r.commulativeExp.to)(counter, frames));
    setLabelText(this.commulativeExp, comma(commulativeExp));

    const commulativeScore = Math.floor(easeOut(r.commulativeScore.from, r.commulativeScore.to)(counter, frames));
    setLabelText(this.commulativeScore, comma(commulativeScore));

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

  protected onUpdate() {
    this.am.update();
  }
}
