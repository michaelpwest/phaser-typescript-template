import { Colors } from './colors';

export const Font = (fontSize: number): Phaser.Types.GameObjects.Text.TextStyle => ({
  fontFamily: 'PressStart2P',
  fontSize: `${fontSize}px`,
  color: Colors.BLACK.HEX,
});

export const FontSizes = {
  SMALL: 40,
  MEDIUM: 48,
  LARGE: 60,
};
