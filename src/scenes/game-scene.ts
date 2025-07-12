import { GroundAttrs, Scenes, Textures } from '../config';
import { PlayerSprite } from '../sprites';

export class GameScene extends Phaser.Scene {
  private player: PlayerSprite;
  private groundCollider: Phaser.GameObjects.TileSprite;

  constructor() {
    super(Scenes.GAME);
  }

  public create(): void {
    // Start game.
    this.startGame();
  }

  public update(): void {
    if (this.player) {
      // Update player.
      this.player.update();
    }
  }

  private startGame(): void {
    // Add player.
    this.player = new PlayerSprite({
      scene: this,
    });

    // Add ground.
    const groundImage = this.textures.get(Textures.GROUND.NAME).getSourceImage();
    const ground = this.add
      .tileSprite(
        0,
        GroundAttrs.Y,
        Number(this.game.config.width) / GroundAttrs.SCALE,
        groundImage.height,
        Textures.GROUND.NAME,
      )
      .setScale(GroundAttrs.SCALE)
      .setOrigin(0);

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
