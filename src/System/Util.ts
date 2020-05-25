function createRectShape(x: number, y: number, width: number, height: number, color: number, round: number): egret.Shape {
  const shape: egret.Shape = new egret.Shape();
  shape.x = x;
  shape.y = y;
  shape.graphics.beginFill(color);
  shape.graphics.drawRoundRect(0, 0, width, height, round);
  shape.graphics.endFill();
  return shape;
}

function createCircleShape(x: number, y: number, radius: number, color: number): egret.Shape {
  const shape: egret.Shape = new egret.Shape();
  shape.x = x;
  shape.y = y;

  shape.graphics.beginFill(color);
  shape.graphics.drawCircle(0, 0, radius);
  shape.graphics.endFill();

  return shape;
}

function createLabel(x: number, y: number, text: string, size: number, ratio: number, color: number, bold: boolean): eui.Label {
  const label: eui.Label = new eui.Label();
  label.scaleX = ratio;
  label.scaleY = ratio;
  label.bold = bold;
  label.size = size;
  label.text = text;
  label.textColor = color;
  label.x = x;
  label.y = y;
  label.multiline = true;
  return label;
}
