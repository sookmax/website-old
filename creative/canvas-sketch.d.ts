// These are partial type definitions for 'canvas-sketch-util'
// Check out the project here: https://github.com/mattdesl/canvas-sketch-util

declare module "canvas-sketch-util/math" {
  export const lerp: any;
  const main: any;
  export default main;
}

declare module "canvas-sketch-util/random" {
  const content: any;
  export default content;
}

declare module "canvas-sketch-util/color" {
  type RGB = [number, number, number];
  type RGBA = [number, number, number, number];
  type CSSColor = string;
  type HSL = [number, number, number];
  type HSLA = [number, number, number, number];

  type HexObject = {
    hex: string;
  };
  type RGBObject = {
    rgb: RGB;
  };
  type RGBAObject = {
    rgba: RGBA;
  };
  type HSLObject = {
    hsl: HSL;
  };
  type HSLAObject = {
    hsla: HSLA;
  };
  type ObjectInput =
    | HexObject
    | RGBObject
    | RGBAObject
    | HSLObject
    | HSLAObject;

  type ParseInput = RGB | RGBA | CSSColor | ObjectInput | "transparant";
  type ParseOutput = HexObject &
    RGBObject &
    RGBAObject &
    HSLObject &
    HSLAObject & { alpha: number };

  type Parse = (input: ParseInput) => ParseOutput;

  type Style = (
    input: [number, number, number] | [number, number, number, number]
  ) => string;

  const main: { parse: Parse; style: Style };
  export default main;
}
