import { Frames } from '../config';
import { ObjectInterface } from '../interfaces';
import { Util } from '../util';
import { BaseSprite } from './base-sprite';

export class Player extends BaseSprite {
  static readonly SCALE = 2;
  static readonly HITBOX_RADIUS = 48;
  static readonly HITBOX_OFFSET_X = 15;
  static readonly HITBOX_OFFSET_Y = 15;
  static readonly START_X = 350;
  static readonly START_Y = 858;
  static readonly JUMP_VELOCITY = 2000;
  static readonly FRAME_RATE = 5;

  constructor(params: ObjectInterface) {
    // Set player frame and x / y starting position.
    params.frame = Frames.PLAYER_WALK_1;
    params.x = Player.START_X;
    params.y = Player.START_Y;
    super(params);

    // Initialize player.
    this.initSprite(Player.SCALE);
    this.initPhysics();
    this.initInput();
    this.initAnimation();

    // Set player hitbox.
    this.body.setCircle(Player.HITBOX_RADIUS, Player.HITBOX_OFFSET_X, Player.HITBOX_OFFSET_Y);

    // Add player to scene.
    this.scene.add.existing(this);

    // Detect screen click / tap.
    this.scene.input.on('pointerdown', () => {
      // Handle player jump.
      this.handleJump();
    });

    // Detect if space bar is pressed.
    const keyboard = this.scene.input.keyboard;
    if (keyboard) {
      keyboard.on('keydown-SPACE', () => {
        // Handle player jump.
        this.handleJump();
      });
    }
  }

  public update(): void {
    // Check if walk animation should be resumed after jump is complete.
    if (this.body.blocked.down && !this.anims.isPlaying) {
      this.play('walk');
    }
  }

  private initAnimation(): void {
    // Add and play walking animation.
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('sprite-sheet', {
        frames: [Frames.PLAYER_WALK_1, Frames.PLAYER_WALK_2],
      }),
      frameRate: Player.FRAME_RATE,
      repeat: -1,
    });
    this.play('walk');
  }

  private handleJump(): void {
    // Check if player is touching the ground before allowing a jump.
    if (this.body.blocked.down) {
      // Stop current animation.
      this.anims.stop();

      // Set jump frame.
      this.setFrame(Frames.PLAYER_JUMP);

      // Make player jump.
      this.body.setVelocityY(-Player.JUMP_VELOCITY);

      // Play jump sound
      Util.playSound(this.scene, 'jump');
    }
  }
}
