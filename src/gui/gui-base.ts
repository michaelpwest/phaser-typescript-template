import { Properties } from '../config';

export class GuiBase {
  public static getScale(scene: Phaser.Scene): number {
    // Get scale.
    return scene.sys.game.canvas.width / Properties.scale.width;
  }
}
