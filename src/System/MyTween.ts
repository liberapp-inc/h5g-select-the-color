class MyTween {

    static labelEffect(EffectLabel:EffectLabel, label : eui.Label, toPos : number){
        egret.Tween.get(label) 
            .to({y:toPos, alpha:1 }, 300)
            .to({y:toPos*2 - label.y, alpha:0 }, 300, egret.Ease.quadOut)
            .call(()=> {
                egret.Tween.removeTweens(label);
                EffectLabel.destroy();
            });
    }

    static touchPanel(panelComopornent:egret.DisplayObjectContainer){
        egret.Tween.get(panelComopornent) 
            .to({scaleX:1.15, scaleY:1.15}, 100, egret.Ease.quartIn)
            .to({scaleX:1, scaleY:1}, 400)
            .call(()=> {
                egret.Tween.removeTweens(panelComopornent);
            });

    }

}