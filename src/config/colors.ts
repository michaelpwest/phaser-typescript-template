const hexToDecimal = (hex: string) => parseInt(hex.slice(1), 16);

const makeColor = (hex: string) => ({
  HEX: hex,
  DECIMAL: hexToDecimal(hex),
});

export const Colors = {
  BLACK: makeColor('#000000'),
  BLUE: makeColor('#1e88e5'),
  GREEN: makeColor('#43a047'),
  ORANGE: makeColor('#fb8c00'),
  RED: makeColor('#e53935'),
  WHITE: makeColor('#ffffff'),
};
