class Panel extends GameCompornent{

    public correctFlag : boolean = false;

    constructor(x : number, y : number, width : number, height : number, color:number) {
        super(x, y, width, height);
        //Panel.panel.push(this);
        this.setShape(0, 0, width,height,color);

        //タッチイベントの付与
        this.compornent.once(egret.TouchEvent.TOUCH_BEGIN, this.touch, this);

    }

    setShape(x: number, y:number, width:number, height:number,color:number){

        const shape : egret.Shape = Util.setRect(x,y,width,height,color,0,true);
        this.compornent.touchEnabled = true;
        this.compornent.addChild(shape);
        this.shapes.push(shape);
        this.compornent.anchorOffsetX += this.compornent.width/2;
        this.compornent.anchorOffsetY += this.compornent.height/2;
        

    }

    touch(){
        if(this.correctFlag){
            console.log("seikai");
            new EffectLabel(this.compornent.x, this.compornent.y,this.compornent.width,this.compornent.height,ColorPallet.GREEN,"Correct")
            MyTween.touchPanel(this.compornent);
        }
        else{
            console.log("miss");
            new EffectLabel(this.compornent.x, this.compornent.y,this.compornent.width,this.compornent.height,ColorPallet.RED,"MISS..")
            MyTween.touchPanel(this.compornent);
        }

    }

    updateContent(){}

}