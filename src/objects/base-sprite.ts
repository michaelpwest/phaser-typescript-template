import { ObjectInterface } from '../interfaces';

export abstract class BaseSprite extends Phaser.GameObjects.Sprite {
  static readonly TEXTURE = 'sprite-sheet';

  declare public body: Phaser.Physics.Arcade.Body;
  protected cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(params: ObjectInterface) {
    super(params.scene, params.x as number, params.y as number, BaseSprite.TEXTURE, params.frame);
  }

  protected initSprite(scale: number): void {
    // Initialize sprite.
    this.setScale(scale);
  }

  protected initPhysics(): void {
    // Enable physics.
    this.scene.physics.world.enable(this);
  }

  protected initInput(): void {
    // Enable input.
    const keyboard = this.scene.input.keyboard;
    if (keyboard) {
      this.cursors = keyboard.createCursorKeys();
    }

    // Enable multi-touch support.
    this.scene.input.addPointer(2);
  }
}
