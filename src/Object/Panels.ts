class Panels extends EgretGameObject {
  private col: number;
  private row: number;
  private panels: Panel[] = [];

  constructor() {
    super();
    this.rect = { x: 0, y: 0, width: EgretGameObject.stageWidth, height: EgretGameObject.stageHeight };
    this.createPanels(3, 4);
  }

  createPanels(row: number, col: number) {
    this.reset();
    this.row = row;
    this.col = col;
    console.log("createPanels", row, col);

    const moveX: number = EgretGameObject.stageWidth / 4.5;
    const moveY: number = EgretGameObject.stageHeight * 0.3;
    const num = row * col;
    const correct = Math.floor(Math.random() * num);

    const rgb = {
      r: Math.floor(Math.random() * 150 + 50),
      g: Math.floor(Math.random() * 150 + 50),
      b: Math.floor(Math.random() * 150 + 50)
    };

    for (let i = 0; i < num; i++) {
      const x = i % row;
      const y = (i - x) / row;
      const rect = { x: x * 200 + moveX, y: y * 200 + moveY, width: 180, height: 180 };
      const panel = new Panel(rect, rgb, correct === i);
      this.addChild(panel);
      this.panels.push(panel);
    }
  }

  private reset() {
    if (!this.panels) {
      return;
    }
    this.panels.forEach(p => p.destroy);
    this.panels = [];
  }

  addDestroyMethod() {
    this.panels = undefined;
    super.addDestroyMethod();
  }

  updateContent() { }
}