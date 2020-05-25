class Panel extends GameCompornent{
    private correctFlag : boolean = false;
    mask :egret.Shape = null;
    private animationCounter: number;
    constructor(x : number, y : number, width : number, height : number, {r,g,b}:{r:number,g:number,b:number},correct:boolean) {
        super(x, y, width, height);
        this.correctFlag = correct;
        this.animationCounter = 0;
        const plusOrNegative: number = Util.randomInt(0, 1) === 0 ? 1 : -1;
        const colorDiff = plusOrNegative * (TheGame.MAX_LEVEL - TheGame.currentLevel);
        let color:number;
        if (correct) {
            color = Util.color(r + colorDiff,g + colorDiff,b + colorDiff);
        } else {
            color = Util.color(r,g,b);
        }
        const needleColor = Util.color(r - colorDiff,g - colorDiff,b - colorDiff);

        this.setShape(0, 0, width,height,color,needleColor);
        this.setMask(0, 0, width,height,0xffffff);
        this.compornent.once(egret.TouchEvent.TOUCH_BEGIN, this.touch, this);
        this.compornent.once(egret.TouchEvent.TOUCH_END, this.end, this);
    }

    setShape(x: number, y:number, width:number, height:number,color:number,needleColor:number){
        const radius = width/2;
        const shape = Util.setCircle(x+radius,y+radius,radius,color,true);
        this.compornent.touchEnabled = true;
        this.compornent.addChild(shape);
        this.shapes.push(shape);

        const needle = new egret.Shape();
        needle.x = x;
        needle.y = y;
        needle.graphics.lineStyle(2,needleColor);
        needle.graphics.moveTo(radius,radius);
        needle.graphics.lineTo(radius,0);
        this.compornent.addChild(needle);
        this.shapes.push(needle);

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
        if(TheGame.gameOverFlag){
            return;
        }
        if (!TheGame.inited) {
            return;
        }
        if(this.correctFlag){
            TheGame.gotCorrectPanel(this);
        }
        else{
            TheGame.gotWrongPanel(this);
        }
    }

    end(){
        // this.mask.alpha = 0;
    }

    /// 60FPS 120BPM
    private static ANIMATION_TABLE = [
0.004,0.024,0.044,0.042,0.04,0.038,0.036,0.034,0.032,0.03,0.028,0.026,0.024,0.022,0.02,0.018,0.016,0.014,0.012,0.01,0.009,0.008,0.007,0.00599999999999999,0.005,0.004,0.003,0.002,0.001,0,
0.004,0.024,0.044,0.042,0.04,0.038,0.036,0.034,0.032,0.03,0.028,0.026,0.024,0.022,0.02,0.018,0.016,0.014,0.012,0.01,0.009,0.008,0.007,0.00599999999999999,0.005,0.004,0.003,0.002,0.001,0,
0.004,0.024,0.044,0.042,0.04,0.038,0.036,0.034,0.032,0.03,0.028,0.026,0.024,0.022,0.02,0.018,0.016,0.014,0.012,0.01,0.009,0.008,0.007,0.00599999999999999,0.005,0.004,0.003,0.002,0.001,0,
0.004,0.024,0.044,0.042,0.04,0.038,0.036,0.034,0.032,0.03,0.028,0.026,0.024,0.022,0.02,0.018,0.016,0.014,0.012,0.01,0.009,0.008,0.007,0.00599999999999999,0.005,0.004,0.003,0.002,0.001,0,
0.004,0.024,0.044,0.042,0.04,0.038,0.036,0.034,0.032,0.03,0.028,0.026,0.024,0.022,0.02,0.018,0.016,0.014,0.012,0.01,0.009,0.008,0.007,0.00599999999999999,0.005,0.004,0.003,0.002,0.001,0,
0.004,0.024,0.044,0.042,0.04,0.038,0.036,0.034,0.032,0.03,0.028,0.026,0.024,0.022,0.02,0.018,0.016,0.014,0.012,0.01,0.009,0.008,0.007,0.00599999999999999,0.005,0.004,0.003,0.002,0.001,0,
0.004,0.024,0.044,0.042,0.04,0.038,0.036,0.034,0.032,0.03,0.028,0.026,0.024,0.022,0.02,0.018,0.016,0.014,0.012,0.01,0.009,0.008,0.007,0.00599999999999999,0.005,0.004,0.003,0.002,0.001,0,
0.004,0.024,0.044,0.042,0.04,0.038,0.036,0.034,0.032,0.03,0.028,0.026,0.024,0.022,0.02,0.018,0.016,0.014,0.012,0.01,0.009,0.008,0.007,0.00599999999999999,0.005,0.004,0.003,0.002,0.001,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ];
    updateContent(){
        const t = Panel.ANIMATION_TABLE;
        const e = 0.95 + t[this.animationCounter % t.length];
        this.compornent.scaleX = e;
        this.compornent.scaleY = e;
        this.compornent.rotation = this.animationCounter * 360 / TheGame.FRAMES_A_TURN;
        this.animationCounter += 1;
    }
}