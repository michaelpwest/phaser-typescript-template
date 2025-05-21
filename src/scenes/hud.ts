import i18n, { __ } from 'i18n-for-browser';
import { BaseScene } from '.';
import { Colors, Debug, FontSizes, Frames, Properties } from '../config';
import { GuiImage, GuiText } from '../gui';
import { Util } from '../util';

export class Hud extends BaseScene {
  private startGameText: Phaser.GameObjects.Text;
  private enFlag: Phaser.GameObjects.Image;
  private esFlag: Phaser.GameObjects.Image;
  private highScoreText: Phaser.GameObjects.Text;
  private scoreText: Phaser.GameObjects.Text;
  private fpsText: Phaser.GameObjects.Text;

  constructor() {
    super('Hud');
  }

  public async create(): Promise<void> {
    super.create();

    // Initialize events.
    this.initEvents();

    // Add start game text.
    this.addStartGameText();

    // Add locale images.
    this.enFlag = await this.addLocaleImage('en', Frames.EN_FLAG, Properties.width * 0.4, Properties.height * 0.6);
    this.esFlag = await this.addLocaleImage('es', Frames.ES_FLAG, Properties.width * 0.6, Properties.height * 0.6);

    // Add high score text.
    this.addHighScoreText();
    this.updateHighScoreText();

    // Add score text.
    this.addScoreText();

    // Update text.
    this.updateText();

    // Toggle HUD elements.
    this.toggleElements();

    // Add debug details.
    this.addDebugDetails();

    // Start game automatically.
    if (Debug.disableMenu) {
      this.startGame();
    }
  }

  public update(): void {
    if (this.registry.get('game-started')) {
      if (this.scoreText?.visible) {
        // Update score text.
        const score = parseInt(this.registry.get('score')) || 0;
        this.scoreText?.setText(`${__('SCORE')}: ${score.toString().padStart(5, '0')}`);
      }
    }

    if (Debug.fps && this.fpsText?.visible) {
      // Update FPS text.
      this.fpsText?.setText(`FPS ${Math.round(this.game.loop.actualFps)}`);
    }
  }

  private initEvents(): void {
    // Start game.
    this.events.on('start-game', () => {
      this.startGame();
    });

    // Show menu.
    this.events.on('show-menu', () => {
      this.toggleElements();
    });

    // Update high score.
    this.events.on('update-high-score', () => {
      this.updateHighScoreText();
    });
  }

  private startGame(): void {
    // Set game started.
    this.registry.set('game-started', true);

    // Start scenes.
    this.scene.launch('Game');
    this.scene.launch('Overlay');

    // Toggle HUD elements.
    this.toggleElements();
  }

  private toggleElements(): void {
    // Get whether game has started.
    const gameStarted = this.registry.get('game-started') || false;

    // Toggle menu buttons and text.
    this.startGameText.setVisible(!gameStarted);
    this.enFlag.setVisible(!gameStarted);
    this.esFlag.setVisible(!gameStarted);

    // Toggle game buttons, controls, and text.
    this.scoreText.setVisible(gameStarted);
  }

  private addStartGameText(): void {
    // Add start game text.
    this.startGameText = GuiText.addText({
      scene: this.scene.scene,
      x: Properties.width * 0.5,
      y: Properties.height * 0.35,
      text: '',
      fontSize: FontSizes.LARGE,
      align: 'center',
      color: Colors.GREEN.HEX,
      origin: {
        x: 0.5,
        y: 0.5,
      },
    }).on('pointerdown', () => {
      // Start game.
      this.startGame();
    });
  }

  private addHighScoreText(): void {
    // Add high score text.
    this.highScoreText = GuiText.addText({
      scene: this.scene.scene,
      x: Properties.width * 0.5,
      y: Properties.height * 0.05,
      text: '',
      fontSize: FontSizes.MEDIUM,
      align: 'center',
      color: Colors.RED.HEX,
      origin: {
        x: 0.5,
        y: 0,
      },
    });
  }

  private async updateHighScoreText(): Promise<void> {
    // Update high score text.
    const highScore = (await Util.getSetting('high-score', this.registry)) || 0;
    this.highScoreText?.setText(`${__('HI')}: ${highScore.toString().padStart(5, '0')}`);
  }

  private addScoreText(): void {
    // Add score text.
    this.scoreText = GuiText.addText({
      scene: this.scene.scene,
      x: Properties.width * 0.5,
      y: Properties.height * 0.12,
      text: '',
      fontSize: FontSizes.MEDIUM,
      align: 'center',
      color: Colors.BLUE.HEX,
      origin: {
        x: 0.5,
        y: 0,
      },
    }).setVisible(false);
  }

  private async addLocaleImage(locale: string, frame: number, x: number, y: number): Promise<Phaser.GameObjects.Image> {
    // Add locale image.
    return GuiImage.addImage({
      scene: this.scene.scene,
      x,
      y,
      texture: 'sprite-sheet',
      frame,
      scale: 2,
    }).on('pointerdown', () => {
      // Update locale.
      Util.updateSetting('locale', locale, this.registry);
      i18n.setLocale(locale);

      // Update text.
      this.updateText();

      // Play menu select sound.
      Util.playSound(this, 'menu-select');
    });
  }

  private addDebugDetails(): void {
    // Add FPS if enabled.
    if (Debug.fps) {
      this.fpsText?.destroy();
      this.fpsText = GuiText.addText({
        scene: this.scene.scene,
        x: 5,
        y: 5,
        text: '',
        fontSize: FontSizes.SMALL,
        color: Colors.GREEN.HEX,
      });
    }
  }

  private async updateText(): Promise<void> {
    this.time.delayedCall(0, () => {
      // Update start game text.
      if (this.startGameText?.visible) {
        this.startGameText?.setText(__('START GAME'));
      }

      // Update high score text.
      this.updateHighScoreText();
    });
  }
}
