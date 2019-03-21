var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super.call(this) || this;
        _this.textGameOver = null;
        _this.textScore = null;
        _this.textNext = null;
        _this.textColor = 0x000000;
        _this.nextGameFlag = false;
        _this.nextGameCount = 0;
        _this.alphaIncreaseFlag = true;
        GameOver.I = _this;
        _this.textColor = Util.color(0, 0, 0);
        _this.textGameOver = Util.myText(Game.width / 2, Game.height / 2 - 70, "TIME IS UP", 120, 0.8, _this.textColor, true);
        _this.textGameOver.anchorOffsetX = _this.textGameOver.width / 2;
        _this.textGameOver.anchorOffsetY = _this.textGameOver.height / 2;
        GameObject.display.addChild(_this.textGameOver);
        _this.textScore = Util.myText(Game.width / 2, Game.height / 2 + 70, "SCORE : " + Score.I.score, 120, 0.8, _this.textColor, true);
        _this.textScore.anchorOffsetX = _this.textScore.width / 2;
        _this.textScore.anchorOffsetY = _this.textScore.height / 2;
        GameObject.display.addChild(_this.textScore);
        _this.textNext = Util.myText(Game.width / 2, Game.height / 2 + 180, "Go to the Next Game", 80, 0.8, _this.textColor, true);
        _this.textNext.anchorOffsetX = _this.textNext.width / 2;
        _this.textNext.anchorOffsetY = _this.textNext.height / 2;
        _this.textNext.alpha = 0;
        GameObject.display.addChild(_this.textNext);
        if (Score.I.score >= Score.I.bestScore) {
            window.localStorage.setItem("bestScore_Select_the_Different_color", Score.I.score.toFixed()); // string
        }
        return _this;
    }
    GameOver.prototype.addDestroyMethod = function () {
        GameObject.display.removeChild(this.textGameOver);
        this.textGameOver = null;
        GameObject.display.removeChild(this.textScore);
        this.textScore = null;
    };
    GameOver.prototype.updateContent = function () {
        GameObject.display.addChild(this.textGameOver);
        GameObject.display.addChild(this.textScore);
        this.gameOver();
        if (this.nextGameFlag) {
            this.alphaIncreaseFlag = Effect.flashing(this.textNext, 0.04, this.alphaIncreaseFlag);
        }
    };
    GameOver.prototype.tap = function (e) {
        GameObject.transit = Game.init;
        this.destroy();
    };
    GameOver.prototype.gameOver = function () {
        var _this = this;
        if (Time.I.time == 0 && CreateStage.I.gameOverFlag == false) {
            CreateStage.I.gameOverFlag = true;
        }
        if (CreateStage.I.gameOverFlag == true && this.nextGameFlag == false) {
            this.nextGameCount += 1 / 60;
        }
        if (this.nextGameCount >= 1 && this.nextGameFlag == false) {
            this.nextGameFlag = true;
            GameObject.display.once(egret.TouchEvent.TOUCH_TAP, function (e) { return _this.tap(e); }, this);
        }
    };
    GameOver.I = null;
    return GameOver;
}(GameObject));
__reflect(GameOver.prototype, "GameOver");
//# sourceMappingURL=GameOver.js.map