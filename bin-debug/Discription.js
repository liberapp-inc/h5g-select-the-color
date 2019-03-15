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
var Discription = (function (_super) {
    __extends(Discription, _super);
    function Discription() {
        var _this = _super.call(this) || this;
        _this.text = [];
        _this.countFlag = false;
        _this.count = 0;
        _this.textColor = Util.color(0, 0, 0);
        var h = 170;
        Discription.I = _this;
        _this.text[0] = Util.myText(Game.width / 2, h, "１つだけ違う色のパネルを", 100, 0.5, _this.textColor, true);
        _this.text[0].anchorOffsetX = _this.text[0].width / 2;
        _this.text[0].anchorOffsetY = _this.text[0].height / 2;
        GameObject.display.addChild(_this.text[0]);
        _this.text[1] = Util.myText(Game.width / 2, h + 70, "タップしてスタート", 100, 0.5, _this.textColor, true);
        _this.text[1].anchorOffsetX = _this.text[1].width / 2;
        _this.text[1].anchorOffsetY = _this.text[1].height / 2;
        GameObject.display.addChild(_this.text[1]);
        _this.text[2] = Util.myText(Game.width / 2, Game.height / 2, "Start", 200, 0.5, _this.textColor, true);
        _this.text[2].anchorOffsetX = _this.text[2].width / 2;
        _this.text[2].anchorOffsetY = _this.text[2].height / 2;
        _this.text[2].alpha = 0;
        GameObject.display.addChild(_this.text[2]);
        return _this;
    }
    Discription.prototype.addDestroyMethod = function () {
        GameObject.display.removeChild(this.text[0]);
        GameObject.display.removeChild(this.text[1]);
        GameObject.display.removeChild(this.text[2]);
        this.text = null;
    };
    Discription.prototype.updateContent = function () {
        if (this.countFlag == true)
            this.animation();
    };
    Discription.prototype.animation = function () {
        if (this.text[2].alpha < 1) {
            this.text[2].alpha += 0.2;
        }
        if (this.text[2].alpha >= 1) {
            this.text[2].alpha = 1;
            this.count += 1;
            if (this.count >= 50) {
                //gameスタート
                CreateStage.startFlag = true;
                this.destroy();
            }
        }
        GameObject.display.addChild(this.text[2]);
    };
    Discription.I = null; // singleton instance
    return Discription;
}(GameObject));
__reflect(Discription.prototype, "Discription");
//# sourceMappingURL=Discription.js.map