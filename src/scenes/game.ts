import { Colors, Properties } from '../config';
import { Player } from '../objects';
import { Util } from '../util';
import { BaseScene } from './base-scene';
import { SceneHandler } from './scene-handler';

export class Game extends BaseScene {
  private player: Player;

  constructor() {
    super('Game');
  }

  public create(): void {
    // Get width and height.
    const width = Properties.scale.width;
    const height = Properties.scale.height;

    // Set scene size.
    this.width = width;
    this.height = height;
    const scene = this.scene.get('BaseScene') as SceneHandler;
    scene.setSize(this);

    // Add player.
    this.player = new Player({
      scene: this,
    });

    // Initialize controller.
    this.registry.set('controller', '');

    // Initialize scores.
    this.registry.set('corners', 0);
    this.registry.set('edges', 0);

    // Add playable area border graphics.
    const graphics = this.add.graphics();
    graphics.lineStyle(2, Colors.SILVER.DECIMAL, 0.2);
    graphics.strokeRect(0, 0, Properties.scale.width, Properties.scale.height);

    // Check for world collision.
    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Body) => {
      // Check if player hit corner or edge.
      const edges = [body.blocked.up, body.blocked.down, body.blocked.left, body.blocked.right].filter(Boolean).length;
      if (edges === 2) {
        // Player hit corner.
        this.registry.inc('corners');

        // Play corner hit sound.
        Util.playSound(this, 'corner-hit');
      } else if (edges === 1) {
        // Player hit edge.
        this.registry.inc('edges');
      }

      // Update color of player randomly.
      this.player.updateColor();
    });
  }

  public update(): void {
    // Update player.
    this.player.update();
  }
}
