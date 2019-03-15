class CreateStage extends GameObject{

    static I : CreateStage = null;
    static box : MyBox[][] = [];
    boxColor : number = null;
    constructor(){
        super();
        CreateStage.I = this;
        this.arrangePanel();
    }

    arrangePanel(){

        const moveX :number = Game.width/10;
        const moveY :number = Game.height/4;

        const correctBoxNumberI = Util.randomInt(0,3);
        const correctBoxNumberJ = Util.randomInt(0,2);

        const r : number = Util.randomInt(20, 235);
        const g : number = Util.randomInt(20, 235);
        const b : number = Util.randomInt(20, 235);

        MyBox.boxColor = Util.color(r,g,b);
        
        const correctBoxColor : number =  Util.color(r-50 , g-50 , b-50 );

        for(let i = 0; i < 4; i++){

            CreateStage.box[i] = [];
            for(let j = 0; j < 3; j++){


                if(i == correctBoxNumberI && j == correctBoxNumberJ){
                    CreateStage.box[i][j] = new MyBox(j*200 + moveX , i*200 + moveY, 180, 180, correctBoxColor);
                    CreateStage.box[i][j].correctFlag = true;

                    
                    
                }else{

                    CreateStage.box[i][j] = new MyBox(j*200 + moveX , i*200 + moveY, 180, 180, MyBox.boxColor);
                }

            }
        }
    }

    updateContent(){}
}