//UIコンポーネントを描画するレイヤー
//リトライするときはaddDestroyMethodをGameOverで実行すること
class UILayer{

    static I :UILayer = null;
    static display: egret.DisplayObjectContainer = null;
    static index :number;


    constructor(){
        UILayer.I = this;
        this.setContainer();
        UILayer.index = GameObject.display.getChildIndex(UILayer.display) ;
    }

    setContainer(){
        UILayer.display = new egret.DisplayObjectContainer();
        
        UILayer.display.width = 0;
        UILayer.display.height = 0;
        GameObject.display.addChild(UILayer.display);
    }

    remove(){
        if(UILayer.display){
            UILayer.display.removeChildren();
            GameObject.display.removeChild(UILayer.display);
            UILayer.display =null;
        }
    }



}

