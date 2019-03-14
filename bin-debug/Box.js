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
    function Box(boxPositionX, boxPositionY, boxWidth, boxHeight, boxColor) {
        var _this = _super.call(this) || this;
        _this.setShape(boxWidth, boxHeight, boxWidth, boxHeight, boxColor);
        return _this;
    }
    Box.prototype.setShape = function (boxPositionX, boxPositionY, boxWidth, boxHeight, boxColor) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.x = boxPositionX;
        this.shape.y = boxPositionY;
        this.shape.graphics.beginFill(boxColor);
        this.shape.graphics.drawRect(0, 0, boxWidth, boxHeight);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    };
    Box.prototype.updateContent = function () { };
    ;
    return Box;
}(GameObject));
__reflect(Box.prototype, "Box");
var PhysicsBox = (function (_super) {
    __extends(PhysicsBox, _super);
    function PhysicsBox(boxPositionX, boxPositionY, boxWidth, boxHeight, boxColor) {
        var _this = _super.call(this) || this;
        _this.boxPositionX = boxPositionX;
        _this.boxPositionY = boxPositionY;
        _this.boxWidth = boxWidth;
        _this.boxHeight = boxHeight;
        _this.boxColor = boxColor;
        _this.setShape(_this.boxWidth, _this.boxHeight);
        return _this;
    }
    PhysicsBox.prototype.setShape = function (width, height) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width / 2;
        this.shape.anchorOffsetY += height / 2;
        this.shape.graphics.beginFill(this.boxColor);
        this.shape.graphics.drawRect(0, 0, width, height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    };
    PhysicsBox.prototype.updateContent = function () { };
    PhysicsBox.prototype.collisionEvent = function () { };
    PhysicsBox.boxMove = false;
    PhysicsBox.blockdownSpeed = 3;
    return PhysicsBox;
}(PhysicsObject));
__reflect(PhysicsBox.prototype, "PhysicsBox");
//# sourceMappingURL=Box.js.map