import { Colors, Properties } from '../config';
import { BaseScene } from './base-scene';

export class World extends BaseScene {
  static GROUND_SCROLL_SPEED = 10;

  private ground: Phaser.GameObjects.TileSprite;
  private groundCollider: Phaser.Types.Physics.Arcade.ImageWithStaticBody;

  constructor() {
    super('World');
  }

  public create(): void {
    super.create();

    // Set background color.
    this.cameras.main.setBackgroundColor(Colors.WHITE.HEX);

    // Add repeating background.
    const backgroundImage = this.textures.get('background').getSourceImage();
    this.add
      .tileSprite(0, Properties.height - backgroundImage.height, Properties.width, backgroundImage.height, 'background')
      .setOrigin(0);

    // Get ground image.
    const groundImage = this.textures.get('ground').getSourceImage();

    // Add repeating ground.
    this.ground = this.add
      .tileSprite(0, Properties.height - groundImage.height, Properties.width, groundImage.height, 'ground')
      .setOrigin(0);

    // Add ground collider.
    this.groundCollider = this.physics.add
      .staticImage(Properties.width * 0.5, Properties.height - groundImage.height * 0.5, '')
      .setSize(Properties.width, groundImage.height)
      .setVisible(false);
  }

  public update(): void {
    // Make ground scroll when game is active.
    if (this.registry.get('game-started') && !this.registry.get('game-over')) {
      this.ground.tilePositionX += World.GROUND_SCROLL_SPEED;
    }
  }

  public getGroundCollider(): Phaser.Types.Physics.Arcade.ImageWithStaticBody {
    // Get ground collider.
    return this.groundCollider;
  }
}
