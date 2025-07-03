import { Constants, Textures } from '../config';
import { Player } from '../objects';
import { BaseScene } from './base-scene';

export class Game extends BaseScene {
  private player: Player;
  private groundCollider: Phaser.GameObjects.TileSprite;

  constructor() {
    super('Game');
  }

  public create(): void {
    super.create();

    // Start game.
    this.startGame();
  }

  public update(): void {
    // Update player.
    this.player.update();
  }

  private startGame(): void {
    // Add player.
    this.player = new Player({
      scene: this,
    });

    // Add ground.
    const groundImage = this.textures.get(Textures.GROUND).getSourceImage();
    const ground = this.add
      .tileSprite(
        0,
        Constants.GROUND.Y,
        Number(this.game.config.width) / Constants.GROUND.SCALE,
        groundImage.height,
        Textures.GROUND,
      )
      .setScale(Constants.GROUND.SCALE)
      .setOrigin(0, 0);

    // Add ground collider.
    this.groundCollider = this.physics.add.existing(ground, true);

    // Initialize colliders.
    this.initColliders();
  }

  private initColliders(): void {
    // Add collider between player and ground.
    this.physics.add.collider(this.player, this.groundCollider as Phaser.Types.Physics.Arcade.ArcadeColliderType);
  }
}
