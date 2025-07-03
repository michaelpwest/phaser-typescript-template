import { ObjectInterface } from '../interfaces';

export abstract class BaseSprite extends Phaser.GameObjects.Sprite {
  declare public body: Phaser.Physics.Arcade.Body;
  protected cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(params: ObjectInterface) {
    super(params.scene, Number(params.x), Number(params.y), String(params.texture), params.frame);
  }

  protected initSprite(scale: number): void {
    // Initialize sprite.
    this.setScale(scale);
  }

  protected initPhysics(): void {
    // Initialize physics.
    this.scene.physics.world.enable(this);
  }
}
