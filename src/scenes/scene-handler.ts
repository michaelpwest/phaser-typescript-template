import { Colors, Properties } from '../config';
import { BaseScene } from './base-scene';

export class SceneHandler extends BaseScene {
  constructor() {
    super('BaseScene');
  }

  public preload(): void {
    // Load sprite sheet.
    this.load.spritesheet('spriteSheet', 'assets/images/sprite-sheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Load sounds.
    this.load.audio('corner-hit', ['assets/sounds/corner-hit.wav']);
    this.load.audio('menu-select', ['assets/sounds/menu-select.wav']);
  }

  public create(): void {
    // Set background color.
    this.cameras.main.setBackgroundColor(Colors.BLACK.HEX);

    // Set world bounds.
    this.cameras.main.setBounds(0, 0, Properties.scale.width, Properties.scale.height);
    this.physics.world.setBounds(0, 0, Properties.scale.width, Properties.scale.height);

    // Start scenes.
    this.scene.launch('Hud');
    this.scene.launch('Overlay');
  }

  public setSize(scene: BaseScene): void {
    // Handle resize.
    scene.scale.on('resize', this.resize, scene);

    // Set width, height, and scale.
    const scaleWidth = scene.scale.gameSize.width;
    const scaleHeight = scene.scale.gameSize.height;

    scene.parent = new Phaser.Structs.Size(scaleWidth, scaleHeight);
    scene.sizer = new Phaser.Structs.Size(scene.width, scene.height, Phaser.Structs.Size.FIT, scene.parent);

    scene.parent.setSize(scaleWidth, scaleHeight);
    scene.sizer.setSize(scaleWidth, scaleHeight);

    this.updateCamera(scene);
  }

  private resize(scene: BaseScene): void {
    // Set width, height, and scale.
    const width = Properties.scale.width;
    const height = Properties.scale.height;

    this.parent.setSize(scene.width, scene.height);
    this.sizer.setSize(scene.width, scene.height);

    // Update camera.
    const camera = this.cameras.main;
    if (camera) {
      const scaleX = this.sizer.width / width;
      const scaleY = this.sizer.height / height;
      camera.setZoom(Math.max(scaleX, scaleY));
      camera.centerOn(width * 0.5, height * 0.5);
    }
  }

  private updateCamera(scene: BaseScene): void {
    // Update camera.
    const camera = scene.cameras.main;
    if (camera) {
      const width = Properties.scale.width;
      const height = Properties.scale.height;
      const scaleX = scene.sizer.width / width;
      const scaleY = scene.sizer.height / height;
      camera.setZoom(Math.max(scaleX, scaleY));
      camera.centerOn(width * 0.5, height * 0.5);
    }
  }
}
