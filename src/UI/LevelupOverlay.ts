class LevelupOverlay extends EgretGameObject {

  private newLevel: eui.Label;
  private tapToStart: eui.Label;

  constructor() {
    super(false);

    this.container.anchorOffsetX = this.stageWidth / 2;
    this.container.anchorOffsetY = this.stageHeight / 2;
    this.container.x = this.container.anchorOffsetX;
    this.container.y = this.container.anchorOffsetY;
    const blackBkgnd = createRectShape(0, 0, this.stageWidth, this.stageHeight, 0, 0);
    blackBkgnd.alpha = 0.8;
    this.addEgretDisplayObject(blackBkgnd);

    const whiteBkgnd: egret.Shape = createRectShape(100, 300, this.stageWidth - 200, this.stageHeight - 600, 0xeeeeee, 32);
    this.addEgretDisplayObject(whiteBkgnd);

    this.newLevel = createLabel("99", { type: "stage", valign: "center", halign: "center" }, 240, 0x333322, true);
    this.addEgretDisplayObject(this.newLevel);

    const levelUp = createLabel("レベルアップ", { type: "next-above", align: "center", anchor: this.newLevel, offsetY: -30 }, 60, 0x333322);
    this.addEgretDisplayObject(levelUp);

    this.tapToStart = createLabel("タップする", { type: "next-below", anchor: this.newLevel, align: "center", offsetY: 60 }, 60, 0x333322, true);
    this.addEgretDisplayObject(this.tapToStart);
  }

  private callback: { fn: Function, thisObject: any };

  show(result: Result, callback: { fn: Function, thisObject: any }): void {
    setLabelText(this.newLevel, `${result.level}`);

    this.container.scaleX = 0;
    this.container.scaleY = 0;
    this.container.alpha = 0;
    this.callback = callback;
    this.visible = true;
    egret.Tween.get(this.container, { loop: false })
      .to({ alpha: 1, scaleX: 1, scaleY: 1 }, FramesOf4thNote * 2 * 1000 / TheGame.FPS, egret.Ease.elasticOut)
      .call(this.onShowed, this);
    egret.Tween.get(this.tapToStart, { loop: true }).to({ scaleX: 0.9, scaleY: 0.9 }, FramesOf4thNote * 2 * 1000 / TheGame.FPS, getLfo(0.1));
  }

  protected onTapped() {
    egret.Tween.get(this.container, { loop: false }).to({ alpha: 0 }, FramesOf8thNote * 1000 / TheGame.FPS, egret.Ease.cubicOut).call(this.onClosed, this);
  }

  private onShowed() {
    this.enableTouch();
  }

  private onClosed() {
    this.disableTouch();
    this.visible = false;
    this.callback.fn.apply(this.callback.thisObject);
  }

  protected onUpdate() {
    //
  }
}
