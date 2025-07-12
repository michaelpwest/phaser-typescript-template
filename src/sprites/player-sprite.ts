import { ActionButtonStates, Animations, Colors, PlayerAttrs, Registry, Sounds, Textures } from '../config';
import { SpriteInterface } from '../interfaces';
import { Util } from '../util';
import { BaseSprite } from './base-sprite';

export class PlayerSprite extends BaseSprite {
  private wrapRectangle: Phaser.Geom.Rectangle;
  private runSound: Phaser.Sound.BaseSound;
  private jumpSound: Phaser.Sound.BaseSound;

  constructor(params: SpriteInterface) {
    // Set player texture and x / y starting position.
    params.texture = Textures.PLAYER.NAME;
    params.x = PlayerAttrs.X;
    params.y = PlayerAttrs.Y;
    super(params);

    // Initialize player.
    this.initSprite(PlayerAttrs.SCALE);
    this.initPhysics();
    this.initInput();
    this.initAnimations();
    this.initSounds();

    // Add number to scene.
    this.scene.add.existing(this);
  }

  public update(): void {
    // Update movement.
    this.updateMovement();

    // Update animation.
    this.updateAnimation();

    // Wrap player within world bounds.
    Phaser.Actions.WrapInRectangle([this], this.wrapRectangle);
  }

  protected initPhysics(): void {
    // Initialize physics.
    super.initPhysics();

    // Set player origin.
    this.setOrigin(0.5, 1);

    // Set player hitbox.
    this.body.setSize(PlayerAttrs.HITBOX.WIDTH, PlayerAttrs.HITBOX.HEIGHT);

    // Add rectangle for wrapping player within world bounds.
    this.wrapRectangle = new Phaser.Geom.Rectangle(
      0,
      0,
      Number(this.scene.game.config.width),
      Number(this.scene.game.config.height),
    );

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
  }

  private initAnimations(): void {
    // Initialize animations.
    Object.values(Animations.PLAYER).forEach((animation) => {
      this.anims.create({
        key: animation.NAME,
        frames: this.anims.generateFrameNumbers(Textures.PLAYER.NAME, {
          frames: animation.FRAMES,
        }),
        frameRate: PlayerAttrs.FRAME_RATE,
        repeat: -1,
      });
    });
  }

  private initSounds(): void {
    // Initialize sounds.
    this.runSound = this.scene.sound.add(Sounds.RUN.NAME, { loop: true });
    this.jumpSound = this.scene.sound.add(Sounds.JUMP.NAME);
  }

  private updateMovement(): void {
    // Update movement.
    const keyboard = this.cursors;
    const joystick = this.scene.registry.get(Registry.JOYSTICK);
    const moveLeft = keyboard.left.isDown || joystick.left;
    const moveRight = keyboard.right.isDown || joystick.right;
    const jump =
      keyboard.space.isDown || this.scene.registry.get(Registry.ACTION_BUTTON) === ActionButtonStates.PRESSED;
    if (this.body && (keyboard || joystick)) {
      if (moveLeft) {
        // Move player left.
        this.body.setVelocityX(-PlayerAttrs.VELOCITY.MOVE);
        this.setFlipX(true);
      } else if (moveRight) {
        // Move player right.
        this.body.setVelocityX(PlayerAttrs.VELOCITY.MOVE);
        this.setFlipX(false);
      } else {
        // Stop player.
        this.body.setVelocityX(0);
      }
      if (jump && this.body.onFloor()) {
        // Jump player.
        this.body.setVelocityY(PlayerAttrs.VELOCITY.JUMP);

        // Play jump sound.
        Util.playSound(this.jumpSound);
      }
    }
  }

  private updateAnimation(): void {
    // Check whether the player is moving / is grounded.
    const isMoving = this.body.velocity.x !== 0;
    const isGrounded = this.body.onFloor();

    if (!isGrounded) {
      if (this.body.velocity.y < 0) {
        // Play jump animation.
        this.anims.play(Animations.PLAYER.JUMP.NAME, true);
      } else if (this.body.velocity.y > 0) {
        // Play fall animation.
        this.anims.play(Animations.PLAYER.FALL.NAME, true);
      }

      // Stop run sound.
      Util.stopSound(this.runSound);
    } else if (isMoving) {
      // Play run animation.
      this.anims.play(Animations.PLAYER.RUN.NAME, true);

      // Play run sound.
      Util.playSound(this.runSound);
    } else {
      // Play idle animation.
      this.anims.play(Animations.PLAYER.IDLE.NAME, true);

      // Stop run sound.
      Util.stopSound(this.runSound);
    }
  }
}
