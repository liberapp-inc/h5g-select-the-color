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
var Time = (function (_super) {
    __extends(Time, _super);
    function Time() {
        var _this = _super.call(this) || this;
        _this.time = 60;
        _this.text = null;
        _this.textBest = null;
        _this.textColor = Util.color(0, 255, 0);
        Time.I = _this;
        _this.time = 15;
        _this.text = Util.myText(400, 0, "Time : 30", 100, 0.5, _this.textColor, true);
        GameObject.display.addChild(_this.text);
        Time.timer = new egret.Timer(1000, 0);
        if (Time.timer.hasEventListener(egret.TimerEvent.TIMER) == false) {
            Time.timer.addEventListener(egret.TimerEvent.TIMER, _this.timePass, _this);
        }
        Time.timer.start();
        return _this;
    }
    Time.prototype.addDestroyMethod = function () {
        GameObject.display.removeChild(this.text);
        this.text = null;
        Time.timer.stop();
        Time.timer.removeEventListener(egret.TimerEvent.TIMER, this.timePass, this);
    };
    Time.prototype.updateContent = function () {
        this.text.text = "Time : " + this.time.toFixed();
    };
    Time.prototype.timePass = function () {
        if (CreateStage.startFlag == true) {
            if (this.time > 0) {
                this.time -= 1;
            }
            if (this.time == 0) {
            }
        }
    };
    Time.I = null; // singleton instance
    Time.timer = null;
    return Time;
}(GameObject));
__reflect(Time.prototype, "Time");
//# sourceMappingURL=Time.js.map