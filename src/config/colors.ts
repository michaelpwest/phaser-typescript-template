const hexToDecimal = (hex: string) => parseInt(hex.slice(1), 16);

const makeColor = (hex: string) => ({
  HEX: hex,
  DECIMAL: hexToDecimal(hex),
});

export const Colors = {
  BLACK: makeColor('#000000'),
  BLUE: makeColor('#6888fc'),
  GREEN: makeColor('#00a800'),
  ORANGE: makeColor('#e45c10'),
  PURPLE: makeColor('#4428bc'),
  RED: makeColor('#a80020'),
  SILVER: makeColor('#bcbcbc'),
  YELLOW: makeColor('#f8b800'),
  WHITE: makeColor('#ffffff'),
};
