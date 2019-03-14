class MainCamera extends GameObject{
    
    static I : MainCamera =null;

    public static display: egret.DisplayObjectContainer;
    
    constructor(){
        super();
        MainCamera.I = this;
        MainCamera.display = new egret.DisplayObjectContainer();
        GameObject.display.addChild(MainCamera.display);
        
    }

    static initial(displayObjectContainer: egret.DisplayObjectContainer){
        MainCamera.display = displayObjectContainer;
    }

    updateContent(){
    }

}