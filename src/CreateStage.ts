class CreateStage extends GameObject{

    static I : CreateStage = null;
    static box : MyBox[][] = [];
    static lightAndDark :number = 50;
    boxColor : number = null;
    startFlag : boolean =false;
    gameOverFlag : boolean = false;
    constructor(){
        super();
        CreateStage.I = this;
        this.arrangePanel();
    }

    arrangePanel(){

        const moveX :number = Game.width/10;
        const moveY :number = Game.height/4;

        //correctPanel番号を設定
        const correctBoxNumberI = Util.randomInt(0,3);
        const correctBoxNumberJ = Util.randomInt(0,2);

        const r : number = Util.randomInt(50, 200);
        const g : number = Util.randomInt(50, 200);
        const b : number = Util.randomInt(50, 200);
        MyBox.boxColor = Util.color(r,g,b);
        
        let sign :number = Util.randomInt(0,1);
        if(sign == 0){sign = 1;}else{sign=-1;}

        const correctBoxColor : number =  Util.color(r+CreateStage.lightAndDark*sign , g+CreateStage.lightAndDark*sign , b+CreateStage.lightAndDark*sign );

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

    addDestroyMethod() {
        CreateStage.I.startFlag = false;
        CreateStage.lightAndDark = 50;
        
    }

    updateContent(){}
}