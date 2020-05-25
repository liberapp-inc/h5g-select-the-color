enum ResultComment{
    ELDERLY,
    DOG,
    CAT,
    TIGER,
    HAWK,
    PC,
}
class Result extends UICompornent{

    static I :Result = null;
    private text:eui.Label = null;
    //private textBest:eui.Label = null;
    private textColor : number = 0x000000;
    private score : number = 0;
    private resultComment : string = null;
    private comentNumber : number = 0;
    static roulette : boolean = false;

    constructor(x : number, y : number, width : number, height : number, color : number) {
        super(x,y,width,height);
        Result.I = this;
        this.textColor = color;
        this.score = Score.score;
        Result.roulette = false;
        this.setText();
        MyTween.result(this, this.text);
        
    }

    setText(){
        const t :string = this.resultComment;
        this.text = Util.myText(TheGame.width/2, TheGame.height*0.5, t, 120, 0.5, this.textColor, true);
        this.text.anchorOffsetX = this.text.width/2;
        this.text.anchorOffsetY = this.text.height/2;
        this.compornent.addChild( this.text );
    }


    addDestroyMethod() {
        if(this.compornent){
            this.compornent.removeChildren();
        }

        this.text = null;
    }

    checkScore(){
        if(this.score >= 0 && this.score < 600){
            this.resultComment = "老眼です";
        }
        else if(this.score >= 600 && this.score < 800){
            this.resultComment = "やや老眼";
        }
        else if(this.score >= 800 && this.score < 1000){
            this.resultComment = "老眼ではありません";
        }
        else if(this.score >= 1000 && this.score < 1200){
            this.resultComment = "クリアな視界";
        }
        else if(this.score >= 1200){
            this.resultComment = "精密機械";
        }
        this.text.text = this.resultComment;
        this.text.anchorOffsetX = this.text.width/2;
        this.text.anchorOffsetY = this.text.height/2;
    }

    changeComment(){
        if(!Result.roulette){
            this.comentNumber++;
            if(this.comentNumber > ResultComment.PC){
                this.comentNumber = 0;
            }
            switch(this.comentNumber){
                case ResultComment.ELDERLY:
                this.resultComment = "老眼です";
                break;
                case ResultComment.DOG:
                this.resultComment = "やや老眼";
                break;
                case ResultComment.CAT:
                this.resultComment = "老眼ではありません";
                break;
                case ResultComment.TIGER:
                this.resultComment = "老眼ではありません";
                break;
                case ResultComment.HAWK:
                this.resultComment = "クリアな視界";
                break;
                case ResultComment.PC:
                this.resultComment = "精密機械";
                break;
            }
            this.text.text = this.resultComment;
            this.text.anchorOffsetX = this.text.width/2;
            this.text.anchorOffsetY = this.text.height/2;

        }

    }

    updateContent(){
        this.changeComment();
    }

}