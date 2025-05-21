import { Font } from '../config';
import { FontInterface, GuiTextInterface } from '../interfaces';

export class GuiText {
  public static addText(params: GuiTextInterface): Phaser.GameObjects.Text {
    // Text style.
    const style = {
      ...Font(params.fontSize as number),
      color: params.color,
      align: params.align,
    } as FontInterface;

    // Handle right alignment.
    if (params.align === 'right') {
      style.rtl = true;
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
