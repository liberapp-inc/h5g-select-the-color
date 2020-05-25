class CreateGameScene extends GameObject {

    static I : CreateGameScene = null;
    static lightAndDark :number = 50;
    static panel :Panel[][] = [];
    boxColor : number = null;
    startFlag : boolean =false;
    //gameOverFlag : boolean = false;
    
    constructor(){
        super();
        CreateGameScene.I = this;
        CreateGameScene.lightAndDark = 50;
        this.startFlag = false;
        this.arrangePanel();
    }

    arrangePanel(){

        const moveX :number = TheGame.width/4.5;
        const moveY :number = TheGame.height*0.3;

        //correctPanel番号を設定
        const correctBoxNumberI = Util.randomInt(0,3);
        const correctBoxNumberJ = Util.randomInt(0,2);

        const r : number = Util.randomInt(50, 200);
        const g : number = Util.randomInt(50, 200);
        const b : number = Util.randomInt(50, 200);
        this.boxColor = Util.color(r,g,b);
        
        let sign :number = Util.randomInt(0,1);
        if(sign == 0){sign = 1;}
        else{sign=-1;}

        const correctBoxColor : number =  Util.color(r+CreateGameScene.lightAndDark*sign , g+CreateGameScene.lightAndDark*sign , b+CreateGameScene.lightAndDark*sign );

        for(let i = 0; i < 4; i++){
            CreateGameScene.panel[i] = [];
            for(let j = 0; j < 3; j++){
                if(i == correctBoxNumberI && j == correctBoxNumberJ){
                    CreateGameScene.panel[i][j] = new Panel(j*200 + moveX , i*200 + moveY, 180, 180, correctBoxColor);
                    CreateGameScene.panel[i][j].correctFlag = true;
                }else{
                    CreateGameScene.panel[i][j] = new Panel(j*200 + moveX , i*200 + moveY, 180, 180, this.boxColor);
                }

            }
        }
    }

    resetShape(){
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 3; j++){
                CreateGameScene.panel[i][j].destroy();
            }
        }
        CreateGameScene.panel = [];

    }

    addDestroyMethod() {
        this.resetShape();
    }

    updateContent(){}
}