import { GuiImageInterface } from '../interfaces';
import { GuiBase } from './gui-base';

export class GuiImage extends GuiBase {
  public static addImage(params: GuiImageInterface): Phaser.GameObjects.Image {
    // Get scale.
    const scale = params.scale?.scale ? this.getScale(params.scene) : 1;

    // Add image to scene.
    const image = params.scene.add.image(params.x, params.y, params.texture, params.frame);

    if (params.color) {
      // Set image tint.
      image.setTintFill(params.color);
    }

    if (params.alpha) {
      // Set image alpha.
      image.setAlpha(params.alpha);
    }

    if (params.scale) {
      // Set image scale.
      image.setScale(params.scale.x * scale, params.scale.y * scale);
    }

    if (params.origin !== undefined) {
      // Set image origin.
      image.setOrigin(params.origin.x, params.origin.y);
    }

    // Set image as interactive.
    image.setInteractive();

    return image;
  }
}
