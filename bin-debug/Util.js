// ゲームで便利に使えるUtilityクラス
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Util = (function () {
    function Util() {
    }
    Util.init = function (eui) {
        this.height = eui.stage.stageHeight;
        this.width = eui.stage.stageWidth;
    };
    Util.random = function (min, max) {
        return min + Math.random() * (max - min);
    };
    Util.randomInt = function (min, max) {
        return Math.floor(min + Math.random() * (max + 0.999 - min));
    };
    Util.clamp = function (value, min, max) {
        if (value < min)
            value = min;
        if (value > max)
            value = max;
        return value;
    };
    //rgbを16進数へ変換
    Util.color = function (r, g, b) {
        //小数点の切り捨て
        var r16 = r.toFixed(0);
        var g16 = g.toFixed(0);
        var b16 = b.toFixed(0);
        //16進数へ変換
        r16 = r.toString(16);
        g16 = g.toString(16);
        b16 = b.toString(16);
        //r = 0だと r16 =0なので00にするために'00'加算
        r16 = ('00' + r16).slice(-2);
        g16 = ('00' + g16).slice(-2);
        b16 = ('00' + b16).slice(-2);
        //色コードへ変換
        var code = parseInt(("0x" + r16 + g16 + b16), 16);
        return code;
    };
    /*    static colorLerp( c0:number, c1:number, rate01:number):number {
            let rate10 = 1 - rate01;
            let color =
                ( ((c0&0xff0000) * rate10 + (c1&0xff0000) * rate01) & 0xff0000 ) +
                ( ((c0&0xff00) * rate10 + (c1&0xff00) * rate01) & 0xff00 ) +
                ( ((c0&0xff) * rate10 + (c1&0xff) * rate01) & 0xff );
            return color;
        }*/
    Util.myText = function (x, y, text, size, ratio, color, bold) {
        var tf = new egret.TextField();
        tf.x = x;
        tf.y = y;
        tf.text = text;
        tf.bold = bold;
        tf.size = size;
        tf.scaleX = ratio;
        tf.scaleY = ratio;
        tf.textColor = color;
        return tf;
    };
    Util.myStrokeText = function (x, y, text, size, ratio, color, font, stColor, stSize) {
        var tf = new egret.TextField();
        tf.x = x;
        tf.y = y;
        tf.scaleX = ratio;
        tf.scaleY = ratio;
        tf.textFlow = [
            { text: text,
                style: {
                    "textColor": color, "size": size, "fontFamily": font, "strokeColor": stColor, "stroke": stSize,
                }
            }
        ];
        return tf;
    };
    return Util;
}());
__reflect(Util.prototype, "Util");
//# sourceMappingURL=Util.js.map