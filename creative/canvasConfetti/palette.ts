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

export function pickTwoFromPalette() {
  const firstColorIndex = Math.floor(Math.random() * PALETTE_HEX.length);
  const firstColor = PALETTE_HEX[firstColorIndex];

  const remainingColors = PALETTE_HEX.filter((hex) => hex !== firstColor);
  const secondColorIndex = Math.floor(Math.random() * remainingColors.length);
  const secondColor = remainingColors[secondColorIndex];

  return [firstColor, secondColor] as [string, string];
}
