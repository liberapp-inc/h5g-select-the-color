class Panel extends GameCompornent{

    public correctFlag : boolean = false;
    private mask :egret.Shape = null;
    private shape: egret.Shape  = null;
    static retryButton : RetryButton = null;

    constructor(x : number, y : number, width : number, height : number, color:number) {
        super(x, y, width, height);
        this.setShape(0, 0, width,height,color);
        this.setMask(0, 0, width,height,0xffffff);

        //タッチイベントの付与
        this.compornent.once(egret.TouchEvent.TOUCH_BEGIN, this.touch, this);
        this.compornent.once(egret.TouchEvent.TOUCH_END, this.end, this);

    }

    setShape(x: number, y:number, width:number, height:number,color:number){
        const radius = width/2;
        this.shape = Util.setCircle(x+radius,y+radius,radius,color,true);
        this.compornent.touchEnabled = true;
        this.compornent.addChild(this.shape);
        this.shapes.push(this.shape);
        this.compornent.anchorOffsetX += radius;
        this.compornent.anchorOffsetY += radius;
        

    }

    setMask(x: number, y:number, width:number, height:number,color:number){
        // const radius = width/2;
        // this.mask = Util.setCircle(x+radius,y+radius,radius,color,true);
        // this.compornent.addChild(this.mask);
        // this.shapes.push(this.mask);
        // this.mask.alpha = 0;
    }

    touch(){
        if(GameOver.gameOverFlag){
            return;
        }
        if(!CreateGameScene.I.startFlag){
            if(this.correctFlag){
                CreateGameScene.I.startFlag = true;
                new TimeLimit(0,0,0,0,ColorPallet.UI_TEXT);
                Panel.retryButton = new RetryButton(TheGame.width - TheGame.width*0.26, TheGame.width*0.16, TheGame.width * 0.26, TheGame.width*0.12, 60, 0.5, "リトライ");
                Description.I.destroy();
                CreateGameScene.I.resetShape();
                CreateGameScene.I.arrangePanel();                
                return;
            }

        }
        else{
            if(this.correctFlag){
                Score.addScore();
                new EffectLabel(this.compornent.x, this.compornent.y,this.compornent.width,this.compornent.height,0x00ff00,Score.combo.toString() + " COMBO")
                MyTween.touchCorrectPanel(this.compornent, this.mask);
                if(CreateGameScene.lightAndDark > 10){
                    CreateGameScene.lightAndDark -=1;
                }

            }
            else{
                Score.miss();
                new EffectLabel(this.compornent.x, this.compornent.y,this.compornent.width,this.compornent.height,0x000000,"MISS..")
                MyTween.touchMissPanel(this.compornent, this.mask);
                CreateGameScene.lightAndDark = 50;
            }

        }

    }

    end(){
        this.mask.alpha = 0;
    }

    private animation = 0;
    /// 60FPS 120BPM
    private static ANIMATION_TABLE = [
0.004,0.024,0.044,0.042,0.04,0.038,0.036,0.034,0.032,0.03,0.028,0.026,0.024,0.022,0.02,0.018,0.016,0.014,0.012,0.01,0.009,0.008,0.007,0.00599999999999999,0.005,0.004,0.003,0.002,0.001,0
    ];
    updateContent(){
        const t = Panel.ANIMATION_TABLE;
        const e = 0.95 + t[this.animation];
        this.shape.scaleX = e;
        this.shape.scaleY = e;
        this.animation = (this.animation + 1 ) % t.length;
    }
}