
class Panels extends EgretGameObject {
  private panels: Panel[] = [];
  private counterToCreate: number = undefined;

  constructor() {
    super();
  }

  start() {
    this.removeChildren();
    this.panels = [];
    this.createPanels("waiting");
  }

  nextPanels() {
    this.counterToCreate = 0;//FramesOf16thNote;
    this.panels.forEach(p => p.out());
  }

  private createPanels(initialState: "waiting" | "in") {
    const [, level] = TheGame.currentTurn
    console.log("createPanels:", level);

    const [row, col] = level.rowcol;
    const num = row * col;
    const correct = Math.floor(Math.random() * num);

    const panelBox = 200;
    const rgb = {
      r: Math.floor(Math.random() * 150 + 50),
      g: Math.floor(Math.random() * 150 + 50),
      b: Math.floor(Math.random() * 150 + 50)
    };

    const ox: number = (EgretGameObject.stageWidth - panelBox * row + panelBox) / 2;
    const oy: number = (EgretGameObject.stageHeight - panelBox * col + panelBox) / 2 + 100;
    for (let i = 0; i < num; i++) {
      const x = i % row;
      const y = (i - x) / row;
      const p = { x: x * panelBox + ox, y: y * panelBox + oy };
      const panel = new Panel(level, p, rgb, correct === i, initialState);
      this.addChild(panel);
      this.panels.push(panel);
    }
  }

  onDestroy() {
    this.panels = undefined;
    super.onDestroy();
  }

  gameover() {
    this.panels.forEach(p => p.gameover());
  }

  onUpdate() {
    if (typeof this.counterToCreate === "undefined") {
      return;
    }
    this.counterToCreate--;
    if (this.counterToCreate <= 0) {
      this.panels = [];
      this.counterToCreate = undefined;
      this.createPanels("in");
    }
  }
}