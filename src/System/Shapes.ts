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

function createCircleFrameShape(x: number, y: number, radius: number, color: number, lineWidth: number): egret.Shape {
  const shape: egret.Shape = new egret.Shape();
  shape.x = x;
  shape.y = y;

  shape.graphics.lineStyle(lineWidth, color);
  shape.graphics.drawCircle(0, 0, radius);

  return shape;
}

function createLabelOld(x: number, y: number, text: string, size: number, ratio: number, color: number, bold: boolean): eui.Label {
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

type PositioningOffset = { offsetX?: number, offsetY?: number };
type Positioning = PositioningOffset & (
  { type: "stage", halign: "left" | "center" | "right", valign: "top" | "center" | "bottom" } |
  { type: "next-above", align: "left" | "center" | "right", anchor: egret.DisplayObject } |
  { type: "next-below", align: "left" | "center" | "right", anchor: egret.DisplayObject } |
  { type: "next-left", align: "top" | "center" | "bottom", anchor: egret.DisplayObject } |
  { type: "next-right", align: "top" | "center" | "bottom", anchor: egret.DisplayObject }
);

function halign(object: eui.Label, anchor: egret.DisplayObject | { x: number, y: number, width: number, height: number, anchorOffsetX: number }, halign: "left" | "center" | "right", ox: number): void {
  switch (halign) {
    case "left":
      object.anchorOffsetX = 0;
      object.x = (anchor.x - anchor.anchorOffsetX) + ox;
      object.textAlign = "left";
      break;
    case "center":
      object.anchorOffsetX = object.width / 2;
      object.x = (anchor.x - anchor.anchorOffsetX) + anchor.width / 2 + ox;
      object.textAlign = "center";
      break;
    case "right":
      object.anchorOffsetX = object.width;
      object.x = (anchor.x - anchor.anchorOffsetX) + anchor.width + ox;
      object.textAlign = "right";
      break;
  }
}

function valign(object: egret.DisplayObject, anchor: egret.DisplayObject | { x: number, y: number, width: number, height: number }, valign: "top" | "center" | "bottom") {
  switch (valign) {
    case "top":
      return anchor.y;
    case "center":
      return anchor.y + (anchor.height - object.height) / 2;
    case "bottom":
      return anchor.y + anchor.height - object.height;
  }
}

function createLabel(text: string, positioning: Positioning, size: number, color: number, bold: boolean = false): eui.Label {
  const label: eui.Label = new eui.Label();
  label.bold = bold;
  label.size = size;
  label.text = text;
  label.textColor = color;
  label.multiline = true;

  setLabelText(label, text, positioning);
  return label;
}

function setLabelText(label: eui.Label, text: string, positioning?: Positioning) {
  if (positioning) {
    (label as any).$positioning = positioning;
  } else {
    positioning = (label as any).$positioning;
  }

  label.text = text;

  const ox = (typeof positioning.offsetX) === "undefined" ? 0 : positioning.offsetX;
  const oy = (typeof positioning.offsetY) === "undefined" ? 0 : positioning.offsetY;
  switch (positioning.type) {
    case "stage": {
      const anchor = { x: 0, y: 0, width: EgretGameObject.stageWidth, height: EgretGameObject.stageHeight, anchorOffsetX: 0 };
      halign(label, anchor, positioning.halign, ox);
      label.y = valign(label, anchor, positioning.valign) + oy;
    }
      break;
    case "next-above":
      halign(label, positioning.anchor, positioning.align, ox);
      label.y = positioning.anchor.y - label.height + oy;
      break;
    case "next-below":
      halign(label, positioning.anchor, positioning.align, ox);
      label.y = positioning.anchor.y + positioning.anchor.height + oy;
      break;
    case "next-left":
      label.x = (positioning.anchor.x - positioning.anchor.anchorOffsetX) - label.width + ox;
      label.y = valign(label, positioning.anchor, positioning.align) + oy;
      break;
    case "next-right":
      label.x = (positioning.anchor.x - positioning.anchor.anchorOffsetX) + positioning.anchor.width + ox;
      label.y = valign(label, positioning.anchor, positioning.align) + oy;
      break;
  }
  return label;
}



