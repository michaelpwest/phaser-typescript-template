import { Colors } from '../config';
import { GuiContainerInterface } from '../interfaces';
import { GuiBase } from './gui-base';

export class GuiContainer extends GuiBase {
  public static addContainer(params: GuiContainerInterface): Phaser.GameObjects.Container {
    // Add container box and border.
    const graphics = params.scene.add.graphics();
    graphics.fillStyle(Colors.BLACK.DECIMAL, 1);
    graphics.lineStyle(4, Colors.WHITE.DECIMAL, 1);
    const rectangleFill = graphics.fillRoundedRect(0, 0, params.width, params.height, 20);
    const rectangleStroke = graphics.strokeRoundedRect(0, 0, params.width, params.height, 20);

    // Add container to scene.
    const container = params.scene.add.container(params.x, params.y, [rectangleFill, rectangleStroke]);

    if (params.elements) {
      // Add container elements.
      container.add(params.elements);
    }

    return container;
  }
}
