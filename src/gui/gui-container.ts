import { Colors } from '../config';
import { GuiContainerInterface } from '../interfaces';

export class GuiContainer {
  public static addContainer(params: GuiContainerInterface): Phaser.GameObjects.Container {
    // Add container box and border.
    const fillGraphics = params.scene.add.graphics();
    fillGraphics.fillStyle(Colors.WHITE.DECIMAL);
    const rectangleFill = fillGraphics.fillRoundedRect(0, 0, params.width, params.height, 20);
    const strokeGraphics = params.scene.add.graphics();
    strokeGraphics.lineStyle(5, Colors.BLACK.DECIMAL);
    const rectangleStroke = strokeGraphics.strokeRoundedRect(0, 0, params.width, params.height, 20);

    if (params.alpha) {
      // Set container background alpha.
      rectangleFill.setAlpha(params.alpha);
    }

    // Add container to scene.
    const container = params.scene.add.container(params.x, params.y, [rectangleFill, rectangleStroke]);

    if (params.elements) {
      // Add container elements.
      container.add(params.elements);
    }

    return container;
  }
}
