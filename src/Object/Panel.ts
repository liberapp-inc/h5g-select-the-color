class Panel extends GameCompornent{

    public correctFlag : boolean = false;
    private mask :egret.Shape = null;
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

        const shape : egret.Shape = Util.setRect(x,y,width,height,color,30,true);
        this.compornent.touchEnabled = true;
        this.compornent.addChild(shape);
        this.shapes.push(shape);
        this.compornent.anchorOffsetX += this.compornent.width/2;
        this.compornent.anchorOffsetY += this.compornent.height/2;
        

    }

    setMask(x: number, y:number, width:number, height:number,color:number){
        this.mask = Util.setRect(x,y,width,height,color,30,true);
        this.compornent.addChild(this.mask);
        this.shapes.push(this.mask);
        this.mask.alpha = 0;
    }

    touch(){
        if(GameOver.gameOverFlag){
            return;
        }
        if(!CreateGameScene.I.startFlag){
            if(this.correctFlag){
                CreateGameScene.I.startFlag = true;
                new TimeLimit(0,0,0,0,ColorPallet.BLACK);
                Panel.retryButton = new RetryButton(Game.width - Game.width*0.26, 4, Game.width * 0.26, Game.width*0.12, 60, 0.5, "リトライ");
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

    updateContent(){}

}