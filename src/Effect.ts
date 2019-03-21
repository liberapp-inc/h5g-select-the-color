class Effect {


    //点滅エフェクト　this.alphaIncreaseFlag = Effect.flashing(this.textNext, 0.04, this.alphaIncreaseFlag);のように使用
    static flashing(obj : any, speed : number, turnOnFlag:boolean) :boolean{
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
    }

    updateContent(){}
}