import { GuiImageInterface } from '../interfaces';

export class GuiImage {
  public static addImage(params: GuiImageInterface): Phaser.GameObjects.Image {
    // Add image to scene.
    const image = params.scene.add.image(params.x, params.y, params.texture, params.frame);

    if (params.scale) {
      image.setScale(params.scale);
    }

    if (params.color) {
      // Set image tint.
      image.setTintFill(params.color);
    }

    if (params.alpha) {
      // Set image alpha.
      image.setAlpha(params.alpha);
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
