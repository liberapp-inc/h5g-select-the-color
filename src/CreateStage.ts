class CreateStage extends GameObject{

    panel : MyBox[][] = [];
    panelColor : number = null;
    constructor(){
        super();
        this.panelColor = Util.color(0,0,255);
        this.arrangePanel();
    }

    arrangePanel(){

        const moveX :number = Game.width/10;
        const moveY :number = Game.height/4;

        for(let i = 0; i < 3; i++){

            this.panel[i] = [];
            for(let j = 0; j < 4; j++){

               this.panel[i][j] = new MyBox(i*200 + moveX , j*200 + moveY, 180, 180, this.panelColor);
               
            }
        }
    }

    updateContent(){}
}