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

    static textFlash(label : eui.Label){
        egret.Tween.get(label,{loop:true}) 
            .to({alpha:1 }, 700)
            .to({alpha:0 }, 700)
            .to({alpha:1 }, 700)
    }

    static result(result:Result, label : eui.Label){
        egret.Tween.get(label) 
            .wait(2000)
            .call(()=> {
                egret.Tween.removeTweens(label);
                Result.roulette = true;
                result.checkScore();
                new RetryButton((TheGame.width - TheGame.width*0.4)/2, TheGame.height*0.6, TheGame.width * 0.4, TheGame.width*0.18, 80, 0.5, "リトライ");
            });
    }
    static touchMissPanel(panelComopornent:egret.DisplayObjectContainer, mask:egret.Shape){
        egret.Tween.get(panelComopornent) 
            .to({scaleX:1.15, scaleY:1.15}, 50, egret.Ease.quartIn)
            .to({scaleX:1, scaleY:1}, 100)
            .call(()=> {
                egret.Tween.removeTweens(panelComopornent);
            });

        egret.Tween.get(mask) 
            .to({alpha:0.3}, 50, egret.Ease.quartIn)
            .to({alpha:0}, 100)
            .call(()=> {
                egret.Tween.removeTweens(mask);
            });

    }
    static touchCorrectPanel(panelComopornent:egret.DisplayObjectContainer, mask:egret.Shape){
        egret.Tween.get(panelComopornent) 
            .to({scaleX:1.15, scaleY:1.15}, 50, egret.Ease.quartIn)
            .to({scaleX:1, scaleY:1}, 100)
            .call(()=> {
                egret.Tween.removeTweens(panelComopornent);
            });

        egret.Tween.get(mask) 
            .to({alpha:0.3}, 50, egret.Ease.quartIn)
            .to({alpha:0}, 100)
            .call(()=> {
                egret.Tween.removeTweens(mask);
                CreateGameScene.I.resetShape();
                CreateGameScene.I.arrangePanel();
            });

    }

}