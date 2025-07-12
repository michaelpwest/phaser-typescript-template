import { Colors } from './colors';

export const Font = (fontSize: number): Phaser.Types.GameObjects.Text.TextStyle => ({
  fontFamily: 'Open Sans Bold',
  fontSize: `${fontSize}px`,
  color: Colors.BLACK.HEX,
});

export const FontSizes = {
  SMALL: 40,
  MEDIUM: 64,
  LARGE: 80,
};
