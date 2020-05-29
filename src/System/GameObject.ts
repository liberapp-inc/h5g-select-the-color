// UnityのGameObjectライクなタスク管理クラス
//  update()に毎フレームの処理を書く
//  オブジェクトを破棄するときはdestroy()を呼ぶ
//  破棄のときに後処理が必要なら、onDestroy()に記述
//  生成時の初期化はUnityと違い、constructor()を使う（引数を渡せる）
//  シーンを切り替えたい場合は transitにシーンロード関数を設定（全オブジェクトを破棄してからtransitを実行）
//  compornentはshapeをひとまとめにする用の親コンテナ。継承先でsetCompornentすること

abstract class GameObject {

  private static objects: GameObject[] = [];

  static transit: () => void;

  static allDestroy() {
    GameObject.objects = GameObject.objects.filter(obj => {
      obj.destroy();
      obj.delete();
      return false;
    });
  }

  static update() {
    GameObject.objects.forEach(obj => obj.onUpdate());

    //destroyFlagがtrueならshapeを削除
    GameObject.objects = GameObject.objects.filter(obj => {
      if (obj.destroyFlag) obj.delete();
      return (!obj.destroyFlag);
    });

    if (GameObject.transit) {
      GameObject.allDestroy();
      GameObject.transit();
      GameObject.transit = null;
    }

  }

  private destroyFlag: boolean = false;
  private children: GameObject[] = [];

  constructor() {
    GameObject.objects.push(this);
  }

  addChild(add: GameObject) {
    this.children.push(add);
  }

  removeChild(remove: GameObject, toDelete: boolean = true) {
    const i = this.children.indexOf(remove);
    if (i === -1) {
      throw new Error("Child not found");
    }
    const c = this.children[i];
    this.children.slice(i, 1);
    if (toDelete) {
      c.destroy();
    }
  }

  removeChildren(toDelete: boolean = true) {
    this.children.forEach(c => c.destroy());
    this.children = [];
  }

  destroy() {
    this.destroyFlag = true;
    this.removeChildren();
  }

  protected abstract onUpdate(): void;

  protected onDestroy() { }

  protected delete() {
    this.onDestroy();
    const newArray: GameObject[] = GameObject.objects.filter(obj => obj.destroyFlag !== true);
    GameObject.objects = newArray;
  }
}


class EgretGameObject extends GameObject {
  private static mainStage: egret.DisplayObjectContainer;
  private static _stageWidth: number;
  private static _stageHeight: number;
  static init(mainStage: egret.DisplayObjectContainer) {
    EgretGameObject._stageWidth = egret.MainContext.instance.stage.stageWidth;
    EgretGameObject._stageHeight = egret.MainContext.instance.stage.stageHeight;
    EgretGameObject.mainStage = mainStage;
  }

  static get stageWidth(): number {
    return EgretGameObject._stageWidth;
  }

  static get stageHeight(): number {
    return EgretGameObject._stageHeight;
  }

  private container: egret.DisplayObjectContainer;

  constructor(visible: boolean = true) {
    super();
    this.container = new egret.DisplayObjectContainer();
    this.container.name = name;
    this.visible = visible;
  }

  set rect({x, y, width, height}: { x: number, y: number, width: number, height: number }) {
    this.container.x = x;
    this.container.y = y;
    this.container.width = width;
    this.container.height = height;
  }

  set position({x, y}: { x: number, y: number }) {
    this.container.x = x;
    this.container.y = y;
  }

  get position(): { x: number, y: number } {
    return {
      x: this.container.x,
      y: this.container.y
    };
  }

  set visible(value: boolean) {
    this.container.visible = value;
  }

  set anchorOffsetX(value: number) {
    this.container.anchorOffsetX = value;
  }

  set anchorOffsetY(value: number) {
    this.container.anchorOffsetY = value;
  }

  set scaleX(value: number) {
    this.container.scaleX = value;
  }

  set scaleY(value: number) {
    this.container.scaleY = value;
  }

  set rotation(value: number) {
    this.container.rotation = value;
  }

  set alpha(value: number) {
    this.container.alpha = value;
  }

  get stageWidth() {
    return EgretGameObject._stageWidth;
  }

  get stageHeight() {
    return EgretGameObject._stageHeight;
  }

  addChild(add: GameObject) {
    this.addChildAt(add, undefined);
  }

  addChildAt(add: GameObject, index: number) {
    super.addChild(add);
    if (!(add instanceof EgretGameObject)) {
      console.log("addChild", "Not Egret Object");
      return;
    }
    this.addEgretDisplayObject(add.container, index);
  }

  removeChild(remove: GameObject) {
    if (!(remove instanceof EgretGameObject)) {
      console.log("removeChild", "Not Egret Object");
      return;
    }
    console.log("removeChild", "Egret Object", remove);
    this.removeEgretDisplayObject(remove.container);
    super.removeChild(remove);
  }

  removeChildren() {
    this.container.removeChildren();
    super.removeChildren();
  }

  addEgretDisplayObject(add: egret.DisplayObject, index?: number): void {
    if (index === undefined) {
      this.container.addChild(add);
    } else {
      this.container.addChildAt(add, index);
    }
  }

  removeEgretDisplayObject(remove: egret.DisplayObject) {
    this.container.removeChild(remove);
  }

  enableTouch() {
    this.container.touchEnabled = true;
    this.container.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapped, this);
  }

  disableTouch() {
    this.container.touchEnabled = false;
    this.container.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapped, this);
  }

  protected onDestroy() {
    if (this.container.hasEventListener) {
      this.container.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapped, this);
    }
    if (this.container.parent) {
      this.container.parent.removeChild(this.container);
    }
    super.onDestroy();
  }

  protected onTapped() { console.warn("onTapped: unhandled"); }
  protected onUpdate() { console.warn("updateContent: unhandled"); }

  protected addAsLayer() {
    EgretGameObject.mainStage.addChild(this.container);
  }
}

abstract class EgretLayerGameObject extends EgretGameObject {
  constructor() {
    super(true);
    this.rect = { x: 0, y: 0, width: EgretGameObject.stageWidth, height: EgretGameObject.stageHeight }
    this.addAsLayer();
  }
}
