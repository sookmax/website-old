import Color from "canvas-sketch-util/color";

export const PALETTE_HEX = [
  "#FB3C52",
  "#FB552A",
  "#57BAFA",
  "#F6FEA6",
  "#FC4654",
  "#FED039",
  "#B6A8DE",
  "#FB5E95",
  "#FD8533",
  "#54A976",
  "#2D76C7",
  "#FC4D5E",
  "#FDF349",
  "#459A69",
];

export const PALETTE_RGB = PALETTE_HEX.map((c) => Color.parse(c).rgb);
