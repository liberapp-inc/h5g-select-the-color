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
var CreateStage = (function (_super) {
    __extends(CreateStage, _super);
    function CreateStage() {
        var _this = _super.call(this) || this;
        _this.panel = [];
        _this.panelColor = null;
        _this.panelColor = Util.color(0, 0, 255);
        _this.arrangePanel();
        return _this;
    }
    CreateStage.prototype.arrangePanel = function () {
        var moveX = Game.width / 10;
        var moveY = Game.height / 4;
        for (var i = 0; i < 3; i++) {
            this.panel[i] = [];
            for (var j = 0; j < 4; j++) {
                this.panel[i][j] = new MyBox(i * 200 + moveX, j * 200 + moveY, 180, 180, this.panelColor);
            }
        }
    };
    CreateStage.prototype.updateContent = function () { };
    return CreateStage;
}(GameObject));
__reflect(CreateStage.prototype, "CreateStage");
//# sourceMappingURL=CreateStage.js.map