import { Font } from '../config';
import { FontInterface, GuiTextInterface } from '../interfaces';
import { GuiBase } from './gui-base';

export class GuiText extends GuiBase {
  public static addText(params: GuiTextInterface): Phaser.GameObjects.Text {
    // Get scale.
    const scale = this.getScale(params.scene);

    // Text style.
    const style = {
      ...Font(params.fontSize as number, params.scale ? scale : 1),
      color: params.color,
      align: params.align,
    } as FontInterface;

    // Set text alignment.
    switch (params.align) {
      case 'right':
        style.rtl = true;
        break;
      case 'center':
      case 'left':
      default:
        break;
    }

    // Add text to scene.
    const text = params.scene.add.text(params.x, params.y, params.text, style);

    if (params.lineSpacing) {
      // Set text line spacing.
      text.setLineSpacing(params.lineSpacing);
    }

    if (params.origin !== undefined) {
      // Set text origin.
      text.setOrigin(params.origin.x, params.origin.y);
    }

    // Set text as interactive.
    text.setInteractive();

    return text;
  }
}
