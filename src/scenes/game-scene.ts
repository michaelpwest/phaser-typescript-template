import Phaser from 'phaser';
import { CameraAttrs, GameStates, GroundAttrs, KillZoneAttrs, Registry, Scenes, Textures } from '../config';
import { PlayerSprite } from '../sprites';

export class GameScene extends Phaser.Scene {
  private player: PlayerSprite;
  private groundCollider: Phaser.GameObjects.TileSprite;
  private killZone: Phaser.GameObjects.Zone;

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

    // Update camera to follow player.
    this.cameras.main.startFollow(this.player, true, CameraAttrs.LERP.X, CameraAttrs.LERP.Y);

    // Add ground.
    const groundImage = this.textures.get(Textures.GROUND.NAME).getSourceImage();
    const ground = this.add
      .tileSprite(0, GroundAttrs.Y, GroundAttrs.LENGTH, groundImage.height, Textures.GROUND.NAME)
      .setScale(GroundAttrs.SCALE)
      .setOrigin(0);

    // Add ground collider.
    this.groundCollider = this.physics.add.existing(ground, true);

    // Add kill zone.
    const bounds = this.groundCollider.getBounds();
    const width = bounds.width + KillZoneAttrs.OVERHANG * 2;
    const x = bounds.centerX - width / 2;
    const y = bounds.bottom + KillZoneAttrs.GAP;
    const killZone = this.add.zone(x, y, width, KillZoneAttrs.THICKNESS).setOrigin(0, 0);
    this.killZone = this.physics.add.existing(killZone, true);

    // Initialize colliders.
    this.initColliders();
  }

  private initColliders(): void {
    // Add collider between player and ground.
    this.physics.add.collider(this.player, this.groundCollider as Phaser.Types.Physics.Arcade.ArcadeColliderType);

    // Add collider between player and kill zone.
    this.physics.add.overlap(this.player, this.killZone as Phaser.Types.Physics.Arcade.ArcadeColliderType, () => {
      // Update game state to game over.
      this.registry.set(Registry.GAME_STATE, GameStates.GAME_OVER);
    });
  }
}
