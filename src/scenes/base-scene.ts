export class BaseScene extends Phaser.Scene {
  constructor(sceneName: string) {
    super(sceneName);
  }

  public create(): void {
    // Resize handler.
    this.scale.on('resize', this.resize, this);

    // Call resize on initialization.
    this.resize(new Phaser.Structs.Size(this.scale.width, this.scale.height));
  }

  protected resize(gameSize: Phaser.Structs.Size): void {
    if (!gameSize || !this.cameras.main) {
      return;
    }

    const { width, height } = gameSize;
    const baseWidth = Number(this.game.config.width);
    const baseHeight = Number(this.game.config.height);

    // Scale and center camera.
    const zoom = Math.min(width / baseWidth, height / baseHeight);
    this.cameras.main.setZoom(zoom);
    this.cameras.main.centerOn(baseWidth / 2, baseHeight / 2);
  }
}
