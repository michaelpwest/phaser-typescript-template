import { FontInterface } from '../interfaces';
import { Colors } from './colors';

export const Font = (fontSize: number, scale = 1): FontInterface => {
  return {
    fontFamily: 'PressStart2P',
    fontSize: `${fontSize * scale}px`,
    color: Colors.WHITE.HEX,
  };
};

export const FontSizes = {
  SMALL: 16,
  MEDIUM: 20,
  LARGE: 28,
};
