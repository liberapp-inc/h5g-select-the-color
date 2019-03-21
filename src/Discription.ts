class Discription extends GameObject{

    static I:Discription = null;   // singleton instance
    text:egret.TextField[] = [];
    textColor : number;
    countFlag : boolean = false;

    count:number = 0;

    alphaIncreaseFlag : boolean[] = [true,true];

    constructor() {
        super();
        this.textColor = Util.color(0,0,0);

        const h :number = 170;
        Discription.I = this;
        this.text[0] = Util.myText(Game.width/2, h, "１つだけ違う色のパネルを", 100, 0.5, this.textColor, true);
        this.text[0].anchorOffsetX = this.text[0].width/2;
        this.text[0].anchorOffsetY = this.text[0].height/2;
        GameObject.display.addChild( this.text[0] );

        this.text[1] = Util.myText(Game.width/2, h + 70, "タップしてスタート", 100, 0.5, this.textColor, true);
        this.text[1].anchorOffsetX = this.text[1].width/2;
        this.text[1].anchorOffsetY = this.text[1].height/2;
        GameObject.display.addChild( this.text[1] );

        this.text[2] = Util.myText(Game.width/2, Game.height/2, "Start", 200, 0.5, this.textColor, true);
        this.text[2].anchorOffsetX = this.text[2].width/2;
        this.text[2].anchorOffsetY = this.text[2].height/2;
        this.text[2].alpha =0;
        GameObject.display.addChild( this.text[2] );


    }
    
    addDestroyMethod() {

        GameObject.display.removeChild( this.text[0] );
        GameObject.display.removeChild( this.text[1] );
        GameObject.display.removeChild( this.text[2] );
        this.text = null;
        
        
    }

    updateContent() {
        if(this.countFlag == true)
        this.animation();
        if(!CreateStage.I.startFlag){
           
            this.alphaIncreaseFlag[0] = Effect.flashing(this.text[0], 0.02, this.alphaIncreaseFlag[0]);
            this.alphaIncreaseFlag[1] = Effect.flashing(this.text[1], 0.02, this.alphaIncreaseFlag[1]);
            
        }
        else{
            this.text[0].alpha = 0;
            this.text[1].alpha = 0;
        }
    }

    animation(){
        CreateStage.I.startFlag = true;
        if(this.text[2].alpha < 1){
            this.text[2].alpha += 0.2;
        }
        if(this.text[2].alpha >= 1){
            this.text[2].alpha = 1;
            this.count += 1;
            if(this.count >=50){
                //gameスタート
                
                this.destroy();

            }
        }
        GameObject.display.addChild( this.text[2] );
    }

/*    flashing(obj : any, speed : number, turnOnFlag:boolean){
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
    }*/

}