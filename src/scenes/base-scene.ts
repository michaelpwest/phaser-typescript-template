export class BaseScene extends Phaser.Scene {
  constructor(sceneName: string) {
    super(sceneName);
  }

  public create(): void {
    // Resize handler.
    this.scale.on('resize', this.resize, this);

    // Call resize on initialization.
    this.resize({ width: this.scale.width, height: this.scale.height } as Phaser.Structs.Size);
  }

  protected resize(gameSize: Phaser.Structs.Size): void {
    // Get width and height.
    const { width, height } = gameSize;
    const baseWidth = Number(this.game.config.width);
    const baseHeight = Number(this.game.config.height);

    // Scale camera.
    const zoom = Math.min(width / baseWidth, height / baseHeight);
    this.cameras.main.setZoom(zoom);

    // Center camera.
    this.cameras.main.centerOn(baseWidth / 2, baseHeight / 2);
  }
}
