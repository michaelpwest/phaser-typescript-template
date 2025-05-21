import i18n, { __ } from 'i18n-for-browser';
import { Overlay } from '.';
import { Colors, Debug, FontSizes, Frames } from '../config';
import { GuiImage, GuiText } from '../gui';
import { Util } from '../util';

export class Hud extends Phaser.Scene {
  private startGameText: Phaser.GameObjects.Text;
  private enFlag: Phaser.GameObjects.Image;
  private esFlag: Phaser.GameObjects.Image;
  private scoreText: Phaser.GameObjects.Text;
  private leftControllerButton: Phaser.GameObjects.Image;
  private rightControllerButton: Phaser.GameObjects.Image;
  private pauseButton: Phaser.GameObjects.Image;
  private fpsText: Phaser.GameObjects.Text;

  constructor() {
    super('Hud');
  }

  public async create(): Promise<void> {
    // Get width and height.
    const width = this.sys.game.canvas.width;
    const height = this.sys.game.canvas.height;

    // Add start game text.
    this.addStartGameText();

    // Add locale images.
    this.enFlag = await this.addLocaleImage('en', Frames.EN_FLAG, width * 0.4, height * 0.65);
    this.esFlag = await this.addLocaleImage('es', Frames.ES_FLAG, width * 0.6, height * 0.65);

    // Add score text.
    this.scoreText = this.addScoreText();

    // Add pause button.
    this.pauseButton = this.addPauseButton();

    // Add controller buttons.
    this.leftControllerButton = this.addControllerButton('left', width * 0.2, 180);
    this.rightControllerButton = this.addControllerButton('right', width * 0.8, 0);

    // Update text.
    this.updateText();

    // Toggle HUD elements.
    this.toggleElements();

    // Add debug details.
    this.addDebugDetails();

    // Start game automatically.
    if (Debug.disableMenu && !this.registry.get('gameStarted')) {
      this.startGame();
    }
  }

  public update(): void {
    if (this.registry.get('gameStarted')) {
      if (this.scoreText?.visible) {
        // Update score text.
        const edges = parseInt(this.registry.get('edges')) || 0;
        const corners = parseInt(this.registry.get('corners')) || 0;
        this.scoreText?.setText(`${__('SCORE')}:${corners}/${edges}`);
      }
    }

    if (Debug.fps && this.fpsText?.visible) {
      // Update FPS text.
      this.fpsText?.setText(`FPS ${Math.round(this.game.loop.actualFps)}`);
    }
  }

  public startGame(): void {
    // Set game started.
    this.registry.set('gameStarted', true);

    // Start scenes.
    this.scene.launch('Game');

    // Get and create overlay scene.
    const overlayScene = this.scene.get('Overlay') as Overlay;
    overlayScene.create();

    // Toggle HUD elements.
    this.toggleElements();
  }

  public toggleElements(): void {
    // Get whether game has started.
    const gameStarted = this.registry.get('gameStarted') || false;

    // Toggle menu buttons and text.
    this.startGameText.setVisible(!gameStarted);
    this.enFlag.setVisible(!gameStarted);
    this.esFlag.setVisible(!gameStarted);

    // Toggle game buttons, controls, and text.
    this.pauseButton.setVisible(gameStarted);
    this.leftControllerButton.setVisible(gameStarted);
    this.rightControllerButton.setVisible(gameStarted);
    this.scoreText.setVisible(gameStarted);
  }

  private addStartGameText(): void {
    // Get width and height.
    const width = this.sys.game.canvas.width;
    const height = this.sys.game.canvas.height;

    // Add start game text.
    this.startGameText = GuiText.addText({
      scene: this.scene.scene,
      x: width * 0.5,
      y: height * 0.35,
      text: '',
      fontSize: FontSizes.LARGE,
      scale: true,
      align: 'center',
      color: Colors.WHITE.HEX,
      origin: {
        x: 0.5,
        y: 0.5,
      },
    }).on('pointerdown', () => {
      // Start game.
      this.startGame();
    });
  }

  private addScoreText(): Phaser.GameObjects.Text {
    // Get width and height.
    const width = this.sys.game.canvas.width;
    const height = this.sys.game.canvas.height;

    // Add score text.
    return GuiText.addText({
      scene: this.scene.scene,
      x: width * 0.5,
      y: height * 0.05,
      text: '',
      fontSize: FontSizes.MEDIUM,
      scale: true,
      lineSpacing: 10,
      align: 'center',
      color: Colors.WHITE.HEX,
      origin: {
        x: 0.5,
        y: 0,
      },
    }).setVisible(false);
  }

  private addPauseButton(): Phaser.GameObjects.Image {
    // Get width.
    const width = this.sys.game.canvas.width;

    // Add pause button.
    return GuiImage.addImage({
      scene: this.scene.scene,
      x: width * 0.925,
      y: this.scoreText.y + this.scoreText.height / 2,
      texture: 'spriteSheet',
      frame: Frames.PAUSE,
      scale: {
        scale: true,
        x: 1.5,
        y: 1.5,
      },
    })
      .on('pointerdown', () => {
        if (this.game.scene.isPaused('Game')) {
          // Continue game.
          this.resumeGame();
        } else {
          // Pause game.
          this.pauseGame();
        }

        // Play menu select sound.
        Util.playSound(this, 'menu-select');
      })
      .setVisible(false);
  }

  private addControllerButton(direction: string, x: number, angle: number): Phaser.GameObjects.Image {
    // Get height.
    const height = this.sys.game.canvas.height;

    // Add controller button.
    return GuiImage.addImage({
      scene: this.scene.scene,
      x,
      y: height * 0.75,
      texture: 'spriteSheet',
      frame: Frames.ARROW,
      color: Colors.BLUE.DECIMAL,
      scale: {
        scale: true,
        x: 3,
        y: 3,
      },
    })
      .setAngle(angle)
      .on('pointerdown', () => {
        // Set controller button as active.
        this.registry.set('controller', direction);
      })
      .setVisible(false);
  }

  private async addLocaleImage(locale: string, frame: number, x: number, y: number): Promise<Phaser.GameObjects.Image> {
    // Add locale image.
    return GuiImage.addImage({
      scene: this.scene.scene,
      x,
      y,
      texture: 'spriteSheet',
      frame,
      scale: {
        scale: true,
        x: 4,
        y: 4,
      },
    }).on('pointerdown', () => {
      // Update locale.
      Util.updateSetting('locale', locale, this.registry);
      i18n.setLocale(locale);

      // Update text.
      this.updateText();
    });
  }

  private addDebugDetails(): void {
    // Add FPS if enabled.
    if (Debug.fps) {
      this.fpsText?.destroy();
      this.fpsText = GuiText.addText({
        scene: this.scene.scene,
        x: 0,
        y: 0,
        text: '',
        fontSize: FontSizes.SMALL,
        scale: false,
        color: Colors.WHITE.HEX,
      });
    }
  }

  private pauseGame(): void {
    // Pause game.
    this.game.scene.pause('Game');
  }

  private resumeGame(): void {
    // Resume game.
    this.game.scene.resume('Game');
  }

  private async updateText(): Promise<void> {
    this.time.delayedCall(0, () => {
      // Update text.
      if (this.startGameText?.visible) {
        this.startGameText?.setText(__('START GAME'));
      }
    });
  }
}
