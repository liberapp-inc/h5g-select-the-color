class Description extends EgretGameObject {
  constructor() {
    super(false);

    const text = createLabel("色の違う\nパネルをタップ", { type: "stage", halign: "center", valign: "center", offsetY: -270 }, 90, ColorPallet.UI_TEXT, true);
    this.addEgretDisplayObject(text);
    // MyTween.textFlash(this.text);
  }

  onUpdate() { }
}