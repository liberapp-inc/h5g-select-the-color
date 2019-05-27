class EffectLabel extends UICompornent{
    label:eui.Label = null;
    labelColor : number = 0x000000;
    text : string = null;


    constructor(x : number, y : number, width : number, height : number, color : number, text:string) {
        super(x,y,width,height);
        this.labelColor = color;
        this.text = text;
        this.setText(0,0,width,height,text);
        MyTween.labelEffect(this, this.label, this.label.y-25);
        
    }

    setText(x : number, y : number, width : number, height : number, text:string){
        this.label = Util.myText(x, y, text, 70, 0.5, this.labelColor, true);
        this.label.alpha = 0.2;
        this.label.anchorOffsetX = this.label.width/2;
        this.label.anchorOffsetY = this.label.height/2;
        this.compornent.addChild( this.label );
    }


    addDestroyMethod() {
        if(this.compornent){
            this.compornent.removeChildren();
        }

        this.label = null;
        this.text = null;
    }

    updateContent(){}

}