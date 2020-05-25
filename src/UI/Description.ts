class Description extends UICompornent{

    static I :Description = null;
    text:eui.Label = null;
    textColor : number = 0x000000;

    constructor(x : number, y : number, width : number, height : number, color : number) {
        super(x,y,width,height);
        Description.I = this;
        this.textColor = color;
        this.setText();
        MyTween.textFlash(this.text);
        
    }

    setText(){
        const t :string = "色の違うパネルをタップ";
        this.text = Util.myText(TheGame.width/2, TheGame.height*0.15, t, 90, 0.5, this.textColor, true);
        this.text.anchorOffsetX = this.text.width/2;
        this.text.anchorOffsetY = this.text.height/2;
        this.text.textAlign = egret.HorizontalAlign.CENTER;
        this.compornent.addChild( this.text );
    }


    addDestroyMethod() {
        if(this.compornent){
            this.compornent.removeChildren();
        }
        egret.Tween.removeTweens(this.text);
        this.text = null;
    }

    updateContent(){}

}