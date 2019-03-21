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
        _this.startFlag = false;
        _this.gameOverFlag = false;
        CreateStage.I = _this;
        _this.arrangePanel();
        return _this;
    }
    CreateStage.prototype.arrangePanel = function () {
        var moveX = Game.width / 10;
        var moveY = Game.height / 4;
        //correctPanel番号を設定
        var correctBoxNumberI = Util.randomInt(0, 3);
        var correctBoxNumberJ = Util.randomInt(0, 2);
        var r = Util.randomInt(50, 200);
        var g = Util.randomInt(50, 200);
        var b = Util.randomInt(50, 200);
        MyBox.boxColor = Util.color(r, g, b);
        var sign = Util.randomInt(0, 1);
        if (sign == 0) {
            sign = 1;
        }
        else {
            sign = -1;
        }
        var correctBoxColor = Util.color(r + CreateStage.lightAndDark * sign, g + CreateStage.lightAndDark * sign, b + CreateStage.lightAndDark * sign);
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
    CreateStage.prototype.addDestroyMethod = function () {
        CreateStage.I.startFlag = false;
        CreateStage.lightAndDark = 50;
    };
    CreateStage.prototype.updateContent = function () { };
    CreateStage.I = null;
    CreateStage.box = [];
    CreateStage.lightAndDark = 50;
    return CreateStage;
}(GameObject));
__reflect(CreateStage.prototype, "CreateStage");
//# sourceMappingURL=CreateStage.js.map