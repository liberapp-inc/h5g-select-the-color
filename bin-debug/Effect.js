var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Effect = (function () {
    function Effect() {
    }
    //点滅エフェクト　this.alphaIncreaseFlag = Effect.flashing(this.textNext, 0.04, this.alphaIncreaseFlag);のように使用
    Effect.flashing = function (obj, speed, turnOnFlag) {
        if (turnOnFlag) {
            obj.alpha += speed;
            if (obj.alpha >= 1) {
                obj.alpha = 1;
                turnOnFlag = false;
            }
        }
        else if (!turnOnFlag) {
            obj.alpha -= speed;
            if (obj.alpha < 0) {
                obj.alpha = 0;
                turnOnFlag = true;
            }
        }
        return turnOnFlag;
    };
    Effect.prototype.updateContent = function () { };
    return Effect;
}());
__reflect(Effect.prototype, "Effect");
//# sourceMappingURL=Effect.js.map