class Time extends GameObject{

    static I:Time = null;   // singleton instance
    public static timer : egret.Timer = null;
    time:number = 60;

    text:egret.TextField = null;
    textBest:egret.TextField = null;

    textColor : number;

    constructor() {
        super();
        this.textColor = Util.color(0,255,0);

        Time.I = this;
        this.time = 15;
        this.text = Util.myText(400, 0, "Time : 30", 100, 0.5, this.textColor, true);
        GameObject.display.addChild( this.text );

        Time.timer = new egret.Timer(1000,0);
        if(Time.timer.hasEventListener(egret.TimerEvent.TIMER) == false){
            Time.timer.addEventListener(egret.TimerEvent.TIMER,this.timePass,this);
        }

        Time.timer.start();

    }
    
    addDestroyMethod() {
        GameObject.display.removeChild( this.text );
        this.text = null;
        Time.timer.stop();
        Time.timer.removeEventListener(egret.TimerEvent.TIMER,this.timePass,this);
        
    }

    updateContent() {
        this.text.text = "Time : " + this.time.toFixed();

    }

    timePass(){
        if(CreateStage.startFlag == true){
            if(this.time > 0){
                this.time -= 1;
            }
            if(this.time == 0){

            }

        }
        
    }


}