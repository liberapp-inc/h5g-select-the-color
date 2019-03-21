class GameOver extends GameObject{

    static I : GameOver = null;
    textGameOver:egret.TextField = null;
    textScore:egret.TextField = null;
    textNext:egret.TextField = null;
    textColor : number = 0x000000;
    nextGameFlag : boolean = false;
    nextGameCount : number = 0;

    alphaIncreaseFlag : boolean = true;

    constructor() {
        super();

        GameOver.I = this;
        this.textColor = Util.color(0,0,0);


        this.textGameOver = Util.myText(Game.width/2, Game.height/2 - 70, "TIME IS UP", 120, 0.8, this.textColor, true);
        this.textGameOver.anchorOffsetX = this.textGameOver.width/2;
        this.textGameOver.anchorOffsetY = this.textGameOver.height/2;
        GameObject.display.addChild( this.textGameOver );
        
        this.textScore = Util.myText(Game.width/2, Game.height/2 + 70, "SCORE : " + Score.I.score, 120, 0.8, this.textColor, true);
        this.textScore.anchorOffsetX = this.textScore.width/2;
        this.textScore.anchorOffsetY = this.textScore.height/2;
        GameObject.display.addChild( this.textScore );

        this.textNext = Util.myText(Game.width/2, Game.height/2 + 180, "Go to the Next Game" , 80, 0.8, this.textColor, true);
        this.textNext.anchorOffsetX = this.textNext.width/2;
        this.textNext.anchorOffsetY = this.textNext.height/2;
        this.textNext.alpha = 0;
        GameObject.display.addChild( this.textNext );

        if( Score.I.score >= Score.I.bestScore ){
            window.localStorage.setItem("bestScore_Select_the_Different_color", Score.I.score.toFixed() ); // string
        }


    }

    addDestroyMethod() {
        GameObject.display.removeChild( this.textGameOver );
        this.textGameOver = null;
        GameObject.display.removeChild( this.textScore );
        this.textScore = null;
    }
    
    updateContent() {
        GameObject.display.addChild( this.textGameOver );
        GameObject.display.addChild( this.textScore );
        this.gameOver();
        if(this.nextGameFlag){
            this.alphaIncreaseFlag = Effect.flashing(this.textNext, 0.06, this.alphaIncreaseFlag);
            
        }
     }

    tap(e:egret.TouchEvent){
        GameObject.transit = Game.init;
        this.destroy();
    }


    gameOver(){
        if(Time.I.time == 0 && CreateStage.I.gameOverFlag == false){
            CreateStage.I.gameOverFlag =true;
           
        }

        if(CreateStage.I.gameOverFlag ==true && this.nextGameFlag == false){
            this.nextGameCount += 1/60;
        }
        if(this.nextGameCount >= 1 && this.nextGameFlag == false){
            this.nextGameFlag = true;
            GameObject.display.once(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.tap(e), this);
        }
    }


/*    flashing(obj : any, speed : number, turnOnFlag:boolean) : boolean{
        if(turnOnFlag){
            obj.alpha += speed;
            if(obj.alpha >=1 ){
                obj.alpha =1;
                turnOnFlag = false;
            }
        }
        else if(!turnOnFlag){
            obj.alpha -= speed;
            if(obj.alpha < 0 ){
                obj.alpha =0;
                turnOnFlag = true;
            }
        }
        return turnOnFlag;
    }*/

}