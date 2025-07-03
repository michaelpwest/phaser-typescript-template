import i18n, { __ } from 'i18n-for-browser';
import { BaseScene } from '.';
import { Colors, Constants, Debug, Font, FontSizes, Frames, Textures } from '../config';
import { Util } from '../util';

export class Hud extends BaseScene {
  private background: Phaser.GameObjects.TileSprite;
  private startGameContainer: Phaser.GameObjects.Container;
  private startGameText: Phaser.GameObjects.Text;
  private gameOverContainer: Phaser.GameObjects.Container;
  private escapeButton: Phaser.GameObjects.Image;
  private fpsText: Phaser.GameObjects.Text;

  constructor() {
    super('Hud');
  }

  public async create(): Promise<void> {
    super.create();

    // Add background.
    this.addBackground();

    // Add start game container.
    this.addStartGameContainer();

    // Add escape button.
    this.addEscapeButton();

    // Toggle HUD elements.
    this.toggleElements();

    // Update text.
    this.updateText();

    // Initialize events();
    this.initEvents();

    // Add debug details.
    this.addDebugDetails();
  }

  public update(): void {
    // Scroll background.
    this.background.tilePositionX += Constants.BACKGROUND.SCROLL;
    this.background.tilePositionY += Constants.BACKGROUND.SCROLL;

    if (Debug.fps && this.fpsText?.visible) {
      // Update FPS text.
      this.fpsText?.setText(`FPS ${Math.round(this.game.loop.actualFps)}`);
    }
  }

  private initEvents(): void {
    // Handle game state change.
    this.registry.events.on('changedata-game-state', (parent: Phaser.Data.DataManager, gameState: string) => {
      switch (gameState) {
        case Constants.GAME.STATES.STARTED:
        case Constants.GAME.STATES.MENU:
          // Toggle HUD elements.
          this.toggleElements();
          break;
        case Constants.GAME.STATES.GAME_OVER:
          // Toggle HUD elements.
          this.toggleElements();

          // Show game over container.
          this.addGameOverContainer();
          break;
        default:
          break;
      }
    });
  }

  private toggleElements(): void {
    // Toggle HUD elements.
    const gameState = this.registry.get('game-state');
    this.startGameContainer.setVisible(gameState === Constants.GAME.STATES.MENU);
    this.escapeButton.setVisible(gameState === Constants.GAME.STATES.STARTED);
  }

  private addBackground(): void {
    // Add background.
    this.background = this.add
      .tileSprite(
        0,
        0,
        Number(this.game.config.width) / Constants.BACKGROUND.SCALE,
        Number(this.game.config.height) / Constants.BACKGROUND.SCALE,
        Textures.BACKGROUND,
      )
      .setScale(Constants.BACKGROUND.SCALE)
      .setOrigin(0, 0);
  }

  private addStartGameContainer(): void {
    // Add rectangle.
    const rectangle = this.add
      .rectangle(0, 0, Constants.HUD.CONTAINER.WIDTH, Constants.HUD.CONTAINER.HEIGHT)
      .setFillStyle(Colors.WHITE.DECIMAL)
      .setStrokeStyle(Constants.HUD.CONTAINER.STROKE, Colors.BLACK.DECIMAL)
      .setAlpha(Constants.HUD.CONTAINER.ALPHA)
      .setOrigin(0);

    // Add start game text.
    this.startGameText = this.add
      .text(Constants.HUD.START_GAME.X, Constants.HUD.START_GAME.Y, '', {
        ...Font(FontSizes.LARGE),
        color: Colors.BLUE.HEX,
        align: 'center',
      })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        // Update game state to started.
        this.registry.set('game-state', Constants.GAME.STATES.STARTED);
      });

    // Add locale images.
    const enFlag = this.addLocaleImage('en', Frames.HUD.FLAGS.EN, Constants.HUD.EN_FLAG.X, Constants.HUD.EN_FLAG.Y);
    const esFlag = this.addLocaleImage('es', Frames.HUD.FLAGS.ES, Constants.HUD.ES_FLAG.X, Constants.HUD.ES_FLAG.Y);

    // Add container to scene.
    this.startGameContainer = this.add.container(Constants.HUD.CONTAINER.X, Constants.HUD.CONTAINER.Y, [
      rectangle,
      this.startGameText,
      enFlag,
      esFlag,
    ]);
  }

  private addGameOverContainer(): void {
    // Add rectangle.
    const rectangle = this.add
      .rectangle(0, 0, Constants.HUD.CONTAINER.WIDTH, Constants.HUD.CONTAINER.HEIGHT)
      .setFillStyle(Colors.WHITE.DECIMAL)
      .setStrokeStyle(Constants.HUD.CONTAINER.STROKE, Colors.BLACK.DECIMAL)
      .setAlpha(Constants.HUD.CONTAINER.ALPHA)
      .setOrigin(0);

    // Add game over text.
    const gameOverText = this.add
      .text(Constants.HUD.GAME_OVER.X, Constants.HUD.GAME_OVER.Y, __('GAME OVER'), {
        ...Font(FontSizes.LARGE),
        color: Colors.BLUE.HEX,
        align: 'center',
      })
      .setOrigin(0.5);

    // Add retry text.
    const retryText = this.add
      .text(Constants.HUD.RETRY.X, Constants.HUD.RETRY.Y, __('RETRY'), {
        ...Font(FontSizes.MEDIUM),
        color: Colors.GREEN.HEX,
        align: 'center',
      })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        // Destroy game over container.
        this.gameOverContainer.destroy();

        // Update game state to started.
        this.registry.set('game-state', Constants.GAME.STATES.STARTED);

        // Play menu select sound.
        Util.playSound(this, 'menu-select');
      });

    // Add quit text.
    const quitText = this.add
      .text(Constants.HUD.QUIT.X, Constants.HUD.QUIT.Y, __('QUIT'), {
        ...Font(FontSizes.MEDIUM),
        color: Colors.RED.HEX,
        align: 'center',
      })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        // Destroy game over container.
        this.gameOverContainer.destroy();

        // Update game state to menu.
        this.registry.set('game-state', Constants.GAME.STATES.MENU);

        // Play menu select sound.
        Util.playSound(this, 'menu-select');
      });

    // Add container to scene.
    this.gameOverContainer = this.add.container(Constants.HUD.CONTAINER.X, Constants.HUD.CONTAINER.Y, [
      rectangle,
      gameOverText,
      retryText,
      quitText,
    ]);
  }

  private addLocaleImage(locale: string, frame: number, x: number, y: number): Phaser.GameObjects.Image {
    // Add locale image.
    return this.add
      .image(x, y, Textures.HUD, frame)
      .setScale(6)
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        // Update locale.
        Util.updateStorage('locale', locale, this.registry);
        i18n.setLocale(locale);

        // Update text.
        this.updateText();

        // Play menu select sound.
        Util.playSound(this, 'menu-select');
      });
  }

  private addEscapeButton(): void {
    // Add escape button.
    this.escapeButton = this.add
      .image(Constants.HUD.ESCAPE.X, Constants.HUD.ESCAPE.Y, Textures.HUD, Frames.HUD.ESCAPE)
      .setScale(6)
      .setOrigin(0, 0)
      .setInteractive()
      .on('pointerdown', () => {
        // Update game state to game over.
        this.registry.set('game-state', Constants.GAME.STATES.GAME_OVER);

        // Play menu select sound.
        Util.playSound(this, 'menu-select');
      });
  }

  private addDebugDetails(): void {
    // Add FPS if enabled.
    if (Debug.fps) {
      this.fpsText?.destroy();

      this.fpsText = this.add
        .text(Constants.HUD.FPS.X, Constants.HUD.FPS.Y, '', {
          ...Font(FontSizes.SMALL),
          color: Colors.RED.HEX,
          align: 'center',
        })
        .setOrigin(1, 0);
    }
  }

  private async updateText(): Promise<void> {
    // Update start game text.
    if (this.startGameText?.visible) {
      this.startGameText?.setText(__('START GAME'));
    }
  }
}
