import { Colors, Constants, Frames, Textures } from '../config';
import { ObjectInterface } from '../interfaces';
import { BaseSprite } from './base-sprite';

export class Player extends BaseSprite {
  constructor(params: ObjectInterface) {
    // Set player texture, frame, and x / y starting position.
    params.texture = Textures.PLAYER;
    params.frame = Frames.PLAYER.RUN[0];
    params.x = Constants.PLAYER.X;
    params.y = Constants.PLAYER.Y;
    super(params);

    // Initialize player.
    this.initSprite(Constants.PLAYER.SCALE);
    this.initPhysics();
    this.initAnimation();

    // Add mask to player so it only displays within world bounds.
    const maskRect = this.scene.add
      .rectangle(
        0,
        0,
        Number(this.scene.game.config.width),
        Number(this.scene.game.config.height),
        Colors.WHITE.DECIMAL,
      )
      .setOrigin(0)
      .setVisible(false);
    this.enableFilters();
    this.filters?.external.addMask(maskRect);

    // Add number to scene.
    this.scene.add.existing(this);
  }

  public update(): void {
    // Move player.
    this.x += 5;

    // Wrap player within world bounds.
    const wrapRect = new Phaser.Geom.Rectangle(
      0,
      0,
      Number(this.scene.game.config.width),
      Number(this.scene.game.config.height),
    );
    Phaser.Actions.WrapInRectangle([this], wrapRect);
  }

  protected initPhysics(): void {
    // Initialize physics.
    super.initPhysics();

    this.setOrigin(0.5, 1);

    // Set player hitbox.
    this.body.setSize(Constants.PLAYER.HITBOX.WIDTH, Constants.PLAYER.HITBOX.HEIGHT);
  }

  private initAnimation(): void {
    // Add and play run animation.
    this.anims.create({
      key: Constants.PLAYER.ANIMATIONS.RUN,
      frames: this.anims.generateFrameNumbers(Textures.PLAYER, {
        frames: Frames.PLAYER.RUN,
      }),
      frameRate: Constants.PLAYER.FRAME_RATE,
      repeat: -1,
    });
    this.play(Constants.PLAYER.ANIMATIONS.RUN);
  }
}
