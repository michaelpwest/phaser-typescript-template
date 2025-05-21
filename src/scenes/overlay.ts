import { __ } from 'i18n-for-browser';
import { BaseScene, Hud } from '.';
import { Colors, Debug, FontSizes, Frames, Properties } from '../config';
import { GuiContainer, GuiImage, GuiText } from '../gui';
import { Util } from '../util';
import { SceneHandler } from './scene-handler';

export class Overlay extends BaseScene {
  private pausedContainer: Phaser.GameObjects.Container;

  constructor() {
    super('Overlay');
  }

  public async create(): Promise<void> {
    // Get width and height.
    const width = Properties.scale.width;
    const height = Properties.scale.height;

    // Set scene size.
    this.width = width;
    this.height = height;
    const scene = this.scene.get('BaseScene') as SceneHandler;
    scene.setSize(this);
  }

  public async update(): Promise<void> {
    // Show paused container if paused.
    if (this.game.scene.isPaused('Game')) {
      if (!this.pausedContainer?.active) {
        this.addPausedContainer();
      }
    } else {
      this.pausedContainer?.destroy();
    }
  }

  private addPausedContainer(): void {
    // Get width and height.
    const width = Properties.scale.width;
    const height = Properties.scale.height;

    // Add paused title text.
    const pausedTitleText = GuiText.addText({
      scene: this.scene.scene,
      x: width * 0.3,
      y: height * 0.05,
      text: __('PAUSED'),
      fontSize: FontSizes.LARGE,
      scale: false,
      align: 'center',
      color: Colors.BLUE.HEX,
      origin: {
        x: 0.5,
        y: 0,
      },
    });

    // Add continue button.
    const continueButton = GuiImage.addImage({
      scene: this.scene.scene,
      x: width * 0.18,
      y: height * 0.22,
      texture: 'spriteSheet',
      frame: Frames.ARROW,
      color: Colors.GREEN.DECIMAL,
      scale: {
        scale: false,
        x: 3,
        y: 3,
      },
    }).on('pointerdown', () => {
      // Continue game.
      this.resumeGame();

      // Play menu select sound.
      Util.playSound(this, 'menu-select');
    });

    // Add continue text.
    const continueText = GuiText.addText({
      scene: this.scene.scene,
      x: width * 0.18,
      y: height * 0.32,
      text: __('CONTINUE'),
      fontSize: FontSizes.MEDIUM,
      scale: false,
      align: 'center',
      color: Colors.GREEN.HEX,
      origin: {
        x: 0.5,
        y: 0,
      },
    }).on('pointerdown', () => {
      // Continue game.
      this.resumeGame();

      // Play menu select sound.
      Util.playSound(this, 'menu-select');
    });

    // Add quit button.
    const quitButton = GuiImage.addImage({
      scene: this.scene.scene,
      x: width * 0.42,
      y: height * 0.22,
      texture: 'spriteSheet',
      frame: Frames.CLOSE,
      color: Colors.RED.DECIMAL,
      scale: {
        scale: false,
        x: 3,
        y: 3,
      },
    }).on('pointerdown', () => {
      // Quit game.
      this.quitGame(false);

      // Play menu select sound.
      Util.playSound(this, 'menu-select');
    });

    // Add quit text.
    const quitText = GuiText.addText({
      scene: this.scene.scene,
      x: width * 0.42,
      y: height * 0.32,
      text: __('QUIT'),
      fontSize: FontSizes.MEDIUM,
      scale: false,
      align: 'center',
      color: Colors.RED.HEX,
      origin: {
        x: 0.5,
        y: 0,
      },
    }).on('pointerdown', () => {
      // Quit game.
      this.quitGame(false);

      // Play menu select sound.
      Util.playSound(this, 'menu-select');
    });

    // Add paused container.
    this.pausedContainer = GuiContainer.addContainer({
      scene: this.scene.scene,
      x: width * 0.2,
      y: height * 0.3,
      width: width * 0.6,
      height: height * 0.4,
      elements: [pausedTitleText, continueButton, quitButton, continueText, quitText],
    });
  }

  private quitGame(restart: boolean): void {
    // Quit game.
    this.registry.destroy();
    this.scene.stop('Game');
    const hudScene = this.scene.get('Hud') as Hud;
    if (restart) {
      hudScene.startGame();
    } else {
      // Toggle HUD elements.
      hudScene.toggleElements();

      // Trigger resize to ensure start game elements display correctly.
      window.dispatchEvent(new Event('resize'));

      // Start game automatically.
      if (Debug.disableMenu) {
        hudScene.startGame();
      }
    }
  }

  private resumeGame(): void {
    // Resume game.
    this.game.scene.resume('Game');
  }
}
