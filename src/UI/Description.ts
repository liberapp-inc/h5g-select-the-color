class Description extends EgretGameObject {
  constructor() {
    super(false);

    const text = createLabelOld(this.stageWidth / 2, this.stageHeight * 0.15, "色の違うパネルをタップ", 90, 0.5, ColorPallet.UI_TEXT, true);
    text.anchorOffsetX = text.width / 2;
    text.anchorOffsetY = text.height / 2;
    text.textAlign = egret.HorizontalAlign.CENTER;
    this.addEgretDisplayObject(text);
    // MyTween.textFlash(this.text);
  }

  onUpdate() { }
}