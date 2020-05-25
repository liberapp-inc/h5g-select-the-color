type RGB = { r: number, g: number, b: number };


function rgbToColor({r, g, b}: RGB, add: RGB | number | undefined = undefined): number {
  if (typeof add === "number") {
    add = { r: add, g: add, b: add }
  } else if (typeof add === "undefined") {
    add = { r: 0, g: 0, b: 0 };
  }
  return ((r + add.r) << 16) + ((g + add.g) << 8) + (b + add.b);
}