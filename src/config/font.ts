import { FontInterface } from '../interfaces';
import { Colors } from './colors';

export const Font = (fontSize: number): FontInterface => {
  return {
    fontFamily: 'Open Sans Bold',
    fontSize: `${fontSize}px`,
    color: Colors.WHITE.HEX,
  };
};

export const FontSizes = {
  SMALL: 40,
  MEDIUM: 64,
  LARGE: 80,
};
