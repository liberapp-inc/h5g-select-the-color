// @see https://github.com/idealx/egret-eui-modal/blob/master/src/components/Toast.ts

interface ToastOptions {
  text: string;
  delay: number;
  success?: () => void;
}

class Toast extends UICompornent  {
  private static I:Toast;

  public static show(options:ToastOptions): void {
    if (!this.I) {
      this.I = new Toast(Main.I.stage.width * 0.6);
    }
    this.I.show(options);
  }

  public static destory() {
    const i = this.I;
    this.I = undefined;
    if (!i) {
      return;
    }
    i.rect.removeChildren();
    i.compornent.removeChildren();
    i.rect = undefined;
    i.label = undefined;
  }

  private rect: eui.Rect;
  private label: eui.Label;
  private showing: boolean;
  private queue: ToastOptions[] = [];

  private constructor(maxWidth:number) {
    super(0,0,0,0);

    this.rect = new eui.Rect();
    this.rect.alpha = 0;

    this.label = new eui.Label();
    this.label.maxWidth = maxWidth;

    this.rect.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onRectCreationComplete, this);
    this.label.addEventListener(eui.UIEvent.RESIZE, this.onLabelResized, this);
    this.compornent.addChild(this.rect);    
  }

  public show(options:ToastOptions) : void {
    console.log(`Toast.show`);
    if (this.showing) {
      this.queue.push(options);
      return;
    }
    this.showing = true;
    const tw = egret.Tween.get(this.rect);
    this.toastText = options.text;
    tw.to({ alpha: 1 }, 300).wait(options.delay).call(this.onStartHide, this);
  }

  private onStartHide() {
    console.log(`Toast.onStartHide`);
    const tw = egret.Tween.get(this.rect);
    tw.to({ alpha: 0 }, 300).call(this.onCompleteHide,this);
  }

  private onCompleteHide() {
    console.log(`Toast.onCompleteHide`);
    this.showing = false;
    if (0 === this.queue.length) {
      return;
    } 
    const options = this.queue.shift();
    this.show(options);
  }

  protected onRectCreationComplete() {
    console.log(`Toast.onRectCreationComplete`);

    this.rect.fillColor = 0x000000;
    this.rect.fillAlpha = 0.6;
    this.rect.horizontalCenter = 0;
    this.rect.verticalCenter = 0;
    this.rect.ellipseWidth = 30;
    this.rect.ellipseHeight = 30;

    this.label.x = 20;
    this.label.y = 20;
    this.label.size = 28;
    this.rect.addChild(this.label);

    this.toastText = "";
  }

  set toastText(text: string) {
    console.log(`Toast.toastText:`);
    this.label.text = text;
  }

  private onLabelResized() {
    console.log(`Toast.onLabelResized:`);

    this.rect.width = this.label.width + 40;
    this.rect.height = this.label.height + 40;
    this.rect.x = (Main.I.width - this.rect.width)/2;
    this.rect.y = (Main.I.height - this.rect.height)/2;
  }

  updateContent() {}
}
