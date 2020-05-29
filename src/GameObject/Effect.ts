class EffectLabel extends EgretGameObject {
  private animation;
  private label: eui.Label;
  private originalY: number;
  constructor(x: number, y: number, width: number, height: number, color: number, text: string) {
    super();
    this.rect = { x, y, width, height };
    this.animation = 0;
    this.originalY = 0;
    this.label = createLabelOld(x, y, text, 70, 0.5, color, true);
    this.label.alpha = 0.2;
    this.label.anchorOffsetX = this.label.width / 2;
    this.label.anchorOffsetY = this.label.height / 2;
    this.addEgretDisplayObject(this.label);
  }

  onDestroy() {
    this.label = null;
    super.onDestroy();
  }

  onUpdate() {
    if (this.animation < 20) {
      // 
    } else if (this.animation < 40) {
      this.label.y = this.label.y - 1;
      this.label.alpha = 20;
    } else {
      this.destroy();
    }
  }
}