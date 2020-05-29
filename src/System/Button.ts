abstract class Button extends EgretGameObject {
  private innerText: eui.Label = null;
  constructor(rect: Rect, size: number, ratio: number, textColor: number, backgroundColor: number, index: string, visible: boolean = true) {
    super(visible);
    this.rect = rect;
    const {x, y, width, height} = rect;
    const shpae = createRectShape(x, y, width, height, backgroundColor, 70);
    this.addEgretDisplayObject(shpae);

    const innerText = createLabelOld(x, y, index, size, ratio, textColor, true);
    innerText.anchorOffsetX = innerText.width / 2;
    innerText.anchorOffsetY = innerText.height / 2;
    innerText.x += width / 2;
    innerText.y += height / 2;
    innerText.textAlign = egret.HorizontalAlign.CENTER;
    innerText.verticalAlign = egret.VerticalAlign.MIDDLE;
    this.addEgretDisplayObject(innerText);
    this.innerText = innerText;

    this.enableTouch();
  }

  onDestroy() {
    this.innerText = null;
    super.onDestroy();
  }
}
