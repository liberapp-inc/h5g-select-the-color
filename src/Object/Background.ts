class Background extends EgretGameObject {
  constructor() {
    super();
    const o = createRectShape(0, 0, EgretGameObject.stageWidth, EgretGameObject.stageHeight, ColorPallet.BACKGROUND, 0);
    this.addEgretDisplayObject(o);
  }

  updateContent() { }
}