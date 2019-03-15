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
        _this.boxColor = null;
        CreateStage.I = _this;
        _this.arrangePanel();
        return _this;
    }
    CreateStage.prototype.arrangePanel = function () {
        var moveX = Game.width / 10;
        var moveY = Game.height / 4;
        var correctBoxNumberI = Util.randomInt(0, 3);
        var correctBoxNumberJ = Util.randomInt(0, 2);
        var r = Util.randomInt(20, 235);
        var g = Util.randomInt(20, 235);
        var b = Util.randomInt(20, 235);
        MyBox.boxColor = Util.color(r, g, b);
        var correctBoxColor = Util.color(r - 50, g - 50, b - 50);
        for (var i = 0; i < 4; i++) {
            CreateStage.box[i] = [];
            for (var j = 0; j < 3; j++) {
                if (i == correctBoxNumberI && j == correctBoxNumberJ) {
                    CreateStage.box[i][j] = new MyBox(j * 200 + moveX, i * 200 + moveY, 180, 180, correctBoxColor);
                    CreateStage.box[i][j].correctFlag = true;
                }
                else {
                    CreateStage.box[i][j] = new MyBox(j * 200 + moveX, i * 200 + moveY, 180, 180, MyBox.boxColor);
                }
            }
        }
    };
    CreateStage.prototype.updateContent = function () { };
    CreateStage.I = null;
    CreateStage.box = [];
    return CreateStage;
}(GameObject));
__reflect(CreateStage.prototype, "CreateStage");
//# sourceMappingURL=CreateStage.js.map