import { Frames, Properties } from '../config';
import { ObjectInterface } from '../interfaces';
import { BaseSprite } from './base-sprite';

export class Obstacle extends BaseSprite {
  static readonly SCALE = 1.5;
  static readonly HITBOX_RADIUS = 62;
  static readonly HITBOX_OFFSET_X = 2;
  static readonly HITBOX_OFFSET_Y = 1;
  static readonly START_X = 2500;
  static readonly START_Y = 862;

  private velocity: number;

  constructor(params: ObjectInterface) {
    // Set obstacle frame and x / y starting position.
    params.frame = Frames.OBSTACLE;
    params.x = Obstacle.START_X;
    params.y = Obstacle.START_Y;
    super(params);

    // Initialize obstacle.
    this.initSprite(Obstacle.SCALE);
    this.initPhysics();

    // Set obstacle hitbox.
    this.body.setCircle(Obstacle.HITBOX_RADIUS, Obstacle.HITBOX_OFFSET_X, Obstacle.HITBOX_OFFSET_Y);

    // Disable obstacle gravity.
    this.body.setAllowGravity(false);

    // Set obstacle velocity.
    this.velocity = params.velocity as number;

    // Add mask to obstacle so it only displays within world bounds.
    const maskRect = this.scene.add
      .rectangle(0, 0, Properties.width, Properties.height, 0xffffff)
      .setOrigin(0)
      .setVisible(false);
    this.enableFilters();
    this.filters?.external.addMask(maskRect);

    // Add obstacle to scene.
    this.scene.add.existing(this);
  }

  public update(): void {
    // Move obstacle.
    this.x -= this.velocity;
  }
}
