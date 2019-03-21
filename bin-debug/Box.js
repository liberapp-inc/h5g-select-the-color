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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
        _this.comboTextField = null;
        _this.textColor = null;
        _this.oldFlag = false;
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
        //ボーナス表示用のテキスト
        _this.comboTextField = Util.myText(x, y, "", 100, 0.5, _this.textColor, true);
        _this.comboTextField.x += width / 2;
        _this.comboTextField.y += height / 2 + 50;
        _this.comboTextField.anchorOffsetX = _this.comboTextField.width / 2;
        _this.comboTextField.anchorOffsetY = _this.comboTextField.height / 2;
        _this.comboTextField.alpha = 0;
        GameObject.display.addChild(_this.comboTextField);
        //アニメーションの移動距離調整用
        _this.animationStopPosY = _this.correctTextField.y - 40;
        //タッチイベントの付与
        _this.shape.once(egret.TouchEvent.TOUCH_BEGIN, _this.touch, _this);
        return _this;
    }
    MyBox.prototype.touch = function (e) {
        var _this = this;
        //タイトル画面
        if (CreateStage.I.startFlag == false) {
            if (this.correctFlag == true) {
                CreateStage.box = [];
                CreateStage.I.arrangePanel();
                //Startの表示
                Discription.I.countFlag = true;
                //oldFlagをつけて、テキストのフェードアウトが終わってから削除
                MyBox.myBox.forEach(function (obj) {
                    _this.oldFlag = true;
                });
            }
        }
        else if (CreateStage.I.startFlag == true && CreateStage.I.gameOverFlag == false) {
            if (this.correctFlag == true) {
                Score.I.addScore();
                this.correctTextField.text = "Correct!!";
                if (Score.I.combo > 0) {
                    this.comboTextField.text = "Combo :" + Score.I.combo.toString();
                }
                else {
                    this.comboTextField.text = "";
                }
                if (CreateStage.lightAndDark > 15) {
                    CreateStage.lightAndDark -= 1;
                }
                //oldFlagをつけて、テキストのフェードアウトが終わってから削除
                MyBox.myBox.forEach(function (obj) {
                    _this.oldFlag = true;
                });
                CreateStage.box = [];
                CreateStage.I.arrangePanel();
                //correct エフェクトを最前面に出す
                GameObject.display.addChild(this.correctTextField);
                GameObject.display.addChild(this.comboTextField);
            }
            else {
                this.correctTextField.text = "Miss...";
                Score.I.comboFlag = false;
                Score.I.combo = 0;
                CreateStage.lightAndDark = 50;
            }
            //文字数によって中央が変化するため、再調整
            this.correctTextField.anchorOffsetX = this.correctTextField.width / 2;
            this.correctTextField.anchorOffsetY = this.correctTextField.height / 2;
            this.comboTextField.anchorOffsetX = this.comboTextField.width / 2;
            this.comboTextField.anchorOffsetY = this.comboTextField.height / 2;
            //テキストアニメーション起動
            //this.animationFlag = true;
        }
    };
    MyBox.prototype.animation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.animationFlag == true)) return [3 /*break*/, 4];
                        if (!(this.correctTextField.y > this.animationStopPosY)) return [3 /*break*/, 1];
                        this.correctTextField.y -= 2;
                        this.comboTextField.y -= 2;
                        //テキストをフェードイン
                        if (this.correctTextField.alpha < 1) {
                            this.correctTextField.alpha += 0.1;
                            this.comboTextField.alpha += 0.1;
                        }
                        return [3 /*break*/, 4];
                    case 1:
                        this.correctTextField.y -= 2;
                        this.comboTextField.y -= 2;
                        if (!(this.correctTextField.alpha > 0)) return [3 /*break*/, 2];
                        this.correctTextField.alpha -= 0.1;
                        this.comboTextField.alpha -= 0.1;
                        return [3 /*break*/, 4];
                    case 2:
                        this.correctTextField.alpha = 0;
                        this.comboTextField.alpha = 0;
                        this.animationFlag = false;
                        return [4 /*yield*/, MyBox.myBox.forEach(function (obj) {
                                if (obj.oldFlag) {
                                    obj.comboTextField.text = null;
                                    obj.correctTextField.text = null;
                                    obj.destroy();
                                }
                            })];
                    case 3:
                        _a.sent();
                        MyBox.myBox = [];
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
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