const hexToDecimal = (hex: string) => parseInt(hex.slice(1), 16);

const makeColor = (hex: string) => ({
  HEX: hex,
  DECIMAL: hexToDecimal(hex),
});

export const Colors = {
  BACKGROUND: makeColor('#101010'),
  BLACK: makeColor('#000000'),
  BLUE: makeColor('#1976d2'),
  GRAY: makeColor('#616161'),
  GREEN: makeColor('#388e3c'),
  RED: makeColor('#d32f2f'),
  WHITE: makeColor('#ffffff'),
};
