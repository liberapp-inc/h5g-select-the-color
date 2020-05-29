class GameLayer extends EgretLayerGameObject {
  panels: Panels;

  constructor() {
    super();
    this.addChild(new Background());
    this.addChild(this.panels = new Panels());
  }

  onUpdate() { }
}