abstract class Box extends GameObject{

    protected width :number;
    protected height :number;
    protected x : number;
    protected y : number;
    protected color : number;
    
    constructor(x : number, y : number, width : number, height : number, color:number) {
        super();
        this.x = x;
        this.y = y;
        this.width = width ;
        this.height =height;
        this.color = color;
        this.setShape(x, y, width, height, color);


    }

    setShape(x : number, y : number, width : number, height : number, color:number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawRect(0, 0, width , height);
        this.shape.graphics.endFill();
        this.shape.touchEnabled = true;
        GameObject.display.addChild(this.shape);


        
    }

    //updateContent(){};

}


abstract class PhysicsBox extends PhysicsObject{

    protected width :number;
    protected height :number;
    protected x : number;
    protected y : number;
    protected color : number;

    
    constructor(x : number, y : number, width : number, height : number, color:number) {
        super();
        this.x = x;
        this.y = y;
        this.width = width ;
        this.height =height;
        this.color = color;
        this.setShape(this.width, this.height);


    }

    private setBody(x : number, y : number, width : number, height : number){

        this.body = new p2.Body({mass : 1, position:[x,y], type:p2.Body.STATIC});
        this.bodyShape = new p2.Box({
            width : width, height: height
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
        
    }


    setShape(width: number, height : number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width/2;
        this.shape.anchorOffsetY += height/2;
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        this.shape.graphics.beginFill(this.color);
        this.shape.graphics.drawRect(0, 0, width , height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }



}

class MyBox extends Box{

    static myBox :MyBox[] = [];
    public correctFlag : boolean = false;
    private animationFlag : boolean = false;
    private animationStopPosY : number = 0;

    static boxColor : number;

    private correctTextField:egret.TextField = null;
    private textColor : number = null;

    constructor(x : number, y : number, width : number, height : number, color:number) {
        super(x, y, width, height, color);
        MyBox.myBox.push(this);

        //タッチした時用のテキスト
        this.textColor = Util.color(0,255,0);
        this.correctTextField = Util.myText(x, y , "", 100, 0.5, this.textColor, true);
        this.correctTextField.x += width/2;
        this.correctTextField.y += height/2;
        this.correctTextField.anchorOffsetX = this.correctTextField.width /2;
        this.correctTextField.anchorOffsetY = this.correctTextField.height/2;
        this.correctTextField.alpha = 0;
        GameObject.display.addChild( this.correctTextField );

        this.animationStopPosY = this.correctTextField.y - 40;

        //this.correctFlag = false;


        //タッチイベントの付与
        this.shape.once(egret.TouchEvent.TOUCH_BEGIN, this.touch, this);
        //タッチイベント
/*        if(GameObject.display.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) == false)
            GameObject.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touch(e), false);*/
    }

    touch(e : egret.TouchEvent){

        if(this.correctFlag == true){
            this.correctTextField.text = "Correct!!"
        }
        else{
            this.correctTextField.text = "Miss..."

        }

        this.correctTextField.anchorOffsetX = this.correctTextField.width /2;
        this.correctTextField.anchorOffsetY = this.correctTextField.height/2;
        this.animationFlag = true;

    }

    animation(){

        if(this.animationFlag == true){

            if(this.correctTextField.y > this.animationStopPosY){
                this.correctTextField.y -= 2;
                //テキストをフェードイン
                if(this.correctTextField.alpha < 1){
                    this.correctTextField.alpha += 0.1;
                }
            }
            else{
                this.correctTextField.y -= 2;
                //テキストをフェードアウト
                if(this.correctTextField.alpha > 0){
                    this.correctTextField.alpha -= 0.1;
                }
                else{
                    this.correctTextField.alpha = 0;
                    this.animationFlag = false;

                    //正解パネルだったら新しいパネルを設置
                    if(this.correctFlag == true){
                        CreateStage.I.arrangePanel();
                        CreateStage.box = [];
                    }
                }
                
            }
        }

    }

    changeColor(color:number){
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawRect(0, 0, this.width , this.height);
        this.shape.graphics.endFill();
        this.shape.touchEnabled = true;
        GameObject.display.addChild(this.shape);
    }

    updateContent(){
        this.animation();
    };


}