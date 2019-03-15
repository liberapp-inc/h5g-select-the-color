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
var Box = (function (_super) {
    __extends(Box, _super);
    function Box(x, y, width, height, color) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        _this.color = color;
        _this.setShape(x, y, width, height, color);
        return _this;
    }
    Box.prototype.setShape = function (x, y, width, height, color) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawRect(0, 0, width, height);
        this.shape.graphics.endFill();
        this.shape.touchEnabled = true;
        GameObject.display.addChild(this.shape);
    };
    return Box;
}(GameObject));
__reflect(Box.prototype, "Box");
var PhysicsBox = (function (_super) {
    __extends(PhysicsBox, _super);
    function PhysicsBox(x, y, width, height, color) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        _this.color = color;
        _this.setShape(_this.width, _this.height);
        return _this;
    }
    PhysicsBox.prototype.setBody = function (x, y, width, height) {
        this.body = new p2.Body({ mass: 1, position: [x, y], type: p2.Body.STATIC });
        this.bodyShape = new p2.Box({
            width: width, height: height
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
    };
    PhysicsBox.prototype.setShape = function (width, height) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width / 2;
        this.shape.anchorOffsetY += height / 2;
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        this.shape.graphics.beginFill(this.color);
        this.shape.graphics.drawRect(0, 0, width, height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    };
    return PhysicsBox;
}(PhysicsObject));
__reflect(PhysicsBox.prototype, "PhysicsBox");
var MyBox = (function (_super) {
    __extends(MyBox, _super);
    function MyBox(x, y, width, height, color) {
        var _this = _super.call(this, x, y, width, height, color) || this;
        _this.correctFlag = false;
        _this.animationFlag = false;
        _this.animationStopPosY = 0;
        _this.correctTextField = null;
        _this.textColor = null;
        MyBox.myBox.push(_this);
        //タッチした時用のテキスト
        _this.textColor = Util.color(0, 255, 0);
        _this.correctTextField = Util.myText(x, y, "", 100, 0.5, _this.textColor, true);
        _this.correctTextField.x += width / 2;
        _this.correctTextField.y += height / 2;
        _this.correctTextField.anchorOffsetX = _this.correctTextField.width / 2;
        _this.correctTextField.anchorOffsetY = _this.correctTextField.height / 2;
        _this.correctTextField.alpha = 0;
        GameObject.display.addChild(_this.correctTextField);
        _this.animationStopPosY = _this.correctTextField.y - 40;
        //this.correctFlag = false;
        //タッチイベントの付与
        _this.shape.once(egret.TouchEvent.TOUCH_BEGIN, _this.touch, _this);
        return _this;
        //タッチイベント
        /*        if(GameObject.display.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) == false)
                    GameObject.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touch(e), false);*/
    }
    MyBox.prototype.touch = function (e) {
        if (this.correctFlag == true) {
            this.correctTextField.text = "Correct!!";
            CreateStage.I.arrangePanel();
            CreateStage.box = [];
        }
        else {
            this.correctTextField.text = "Miss...";
        }
        this.correctTextField.anchorOffsetX = this.correctTextField.width / 2;
        this.correctTextField.anchorOffsetY = this.correctTextField.height / 2;
        this.animationFlag = true;
    };
    MyBox.prototype.animation = function () {
        if (this.animationFlag == true) {
            if (this.correctTextField.y > this.animationStopPosY) {
                this.correctTextField.y -= 2;
                //テキストをフェードイン
                if (this.correctTextField.alpha < 1) {
                    this.correctTextField.alpha += 0.1;
                }
            }
            else {
                this.correctTextField.y -= 2;
                //テキストをフェードアウト
                if (this.correctTextField.alpha > 0) {
                    this.correctTextField.alpha -= 0.1;
                }
                else {
                    this.correctTextField.alpha = 0;
                    this.animationFlag = false;
                    //正解パネルだったら新しいパネルを設置
                    if (this.correctFlag == true) {
                        /*                        CreateStage.I.arrangePanel();
                                                CreateStage.box = [];*/
                    }
                }
            }
        }
    };
    MyBox.prototype.changeColor = function (color) {
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawRect(0, 0, this.width, this.height);
        this.shape.graphics.endFill();
        this.shape.touchEnabled = true;
        GameObject.display.addChild(this.shape);
    };
    MyBox.prototype.updateContent = function () {
        this.animation();
    };
    ;
    MyBox.myBox = [];
    return MyBox;
}(Box));
__reflect(MyBox.prototype, "MyBox");
//# sourceMappingURL=Box.js.map