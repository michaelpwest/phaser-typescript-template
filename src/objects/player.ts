import { Colors, Frames, Properties } from '../config';
import { ObjectInterface } from '../interfaces';
import { Util } from '../util';
import { BaseSprite } from './base-sprite';

export class Player extends BaseSprite {
  static readonly SCALE = 4;
  static readonly SIZE_WIDTH = 24;
  static readonly SIZE_HEIGHT = 24;
  static readonly START_X = 0.5;
  static readonly START_Y = 0.5;
  static readonly ANGLES = [45, 135, 225, 315];
  static readonly VELOCITY = 200;

  constructor(params: ObjectInterface) {
    // Get width and height.
    const width = Properties.scale.width;
    const height = Properties.scale.height;

    // Set frame and x, y starting position.
    params.frame = Frames.PLAYER;
    params.x = width * Player.START_X;
    params.y = height * Player.START_Y;
    super(params);

    // Initialize player.
    this.initSprite(Player.SCALE);
    this.initPhysics();
    this.initPhysicsBounds();
    this.initInput();

    // Pick a random angle and move in that direction.
    const angle = Phaser.Math.RND.pick(Player.ANGLES);
    this.scene.physics.velocityFromRotation(Phaser.Math.DegToRad(angle), Player.VELOCITY, this.body.velocity);

    // Update color of player randomly.
    this.updateColor();

    // Add player to scene.
    this.scene.add.existing(this);
  }

  protected initPhysics(): void {
    super.initPhysics();

    // Set physics parameters.
    this.body.setSize(Player.SIZE_WIDTH, Player.SIZE_HEIGHT);

    // Set bounce.
    this.body.setBounce(1);
  }

  public update(): void {
    // Update movement.
    this.updateMovement();
  }

  public updateColor(): void {
    // Update color of player randomly.
    let colors = [
      Colors.BLUE.DECIMAL,
      Colors.GREEN.DECIMAL,
      Colors.ORANGE.DECIMAL,
      Colors.PURPLE.DECIMAL,
      Colors.RED.DECIMAL,
      Colors.YELLOW.DECIMAL,
    ];
    colors = colors.filter((color) => color != this.tint);
    this.setTint(Phaser.Math.RND.pick(colors));
  }

  private updateMovement(): void {
    // Update movement.
    const cursorsKeyboard = this.cursors;
    if (this.body && cursorsKeyboard) {
      // Get movement angle.
      const angle = Util.normalizeAngle(Phaser.Math.RadToDeg(this.body.angle));

      // Handle left and right movement.
      const controller = this.scene.registry.get('controller');
      if (Phaser.Input.Keyboard.JustDown(cursorsKeyboard.left) || controller == 'left') {
        this.updateAngle(angle, -90);
      } else if (Phaser.Input.Keyboard.JustDown(cursorsKeyboard.right) || controller == 'right') {
        this.updateAngle(angle, 90);
      }

      // Set controller button as inactive.
      this.scene.registry.set('controller', '');
    }
  }

  private updateAngle(angle: number, adjustment: number): void {
    // Update angle.
    const newAngle = Phaser.Math.DegToRad(angle + adjustment);
    this.scene.physics.velocityFromRotation(newAngle, Player.VELOCITY, this.body.velocity);
  }
}
