class CreateGameScene extends GameObject {

    static I: CreateGameScene = null;

    static panel: Panel[][] = [];

    constructor() {
        super();
        CreateGameScene.I = this;
        this.arrangePanel();
    }

    arrangePanel() {

        const moveX: number = TheGame.width / 4.5;
        const moveY: number = TheGame.height * 0.3;

        //correctPanel番号を設定
        const correctBoxNumberI = Util.randomInt(0, 3);
        const correctBoxNumberJ = Util.randomInt(0, 2);

        const r: number = Util.randomInt(50, 200);
        const g: number = Util.randomInt(50, 200);
        const b: number = Util.randomInt(50, 200);

        for (let i = 0; i < 4; i++) {
            CreateGameScene.panel[i] = [];
            for (let j = 0; j < 3; j++) {
                const correct = i == correctBoxNumberI && j == correctBoxNumberJ;
                CreateGameScene.panel[i][j] = new Panel(j * 200 + moveX, i * 200 + moveY, 180, 180, {r,g,b},correct);
            }
        }
    }

    resetShape() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                CreateGameScene.panel[i][j].destroy();
            }
        }
        CreateGameScene.panel = [];

    }

    addDestroyMethod() {
        this.resetShape();
    }

    updateContent() { }
}