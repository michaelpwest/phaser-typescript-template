import i18n, { __ } from 'i18n-for-browser';
import { BaseScene } from '.';
import {
  BackgroundAttrs,
  Colors,
  ControllerStates,
  Debug,
  Font,
  FontSizes,
  Frames,
  GameStates,
  HudAttrs,
  Registry,
  Scenes,
  Sounds,
  Textures,
} from '../config';
import { Util } from '../util';

export class Hud extends BaseScene {
  private background: Phaser.GameObjects.TileSprite;
  private startGameContainer: Phaser.GameObjects.Container;
  private startGameText: Phaser.GameObjects.Text;
  private gameOverContainer: Phaser.GameObjects.Container;
  private controller: Phaser.GameObjects.Image;
  private actionButton: Phaser.GameObjects.Image;
  private escapeButton: Phaser.GameObjects.Image;
  private fpsText: Phaser.GameObjects.Text;
  private menuSelectSound: Phaser.Sound.BaseSound;
  private startGameSound: Phaser.Sound.BaseSound;
  private gameOverSound: Phaser.Sound.BaseSound;

  constructor() {
    super(Scenes.HUD);
  }

  public create(): void {
    super.create();

    // Add background.
    this.addBackground();

    // Add start game container.
    this.addStartGameContainer();

    // Add controller.
    this.addController();

    // Add action button.
    this.addActionButton();

    // Add escape button.
    this.addEscapeButton();

    // Add FPS.
    this.addFps();

    // Toggle HUD elements.
    this.toggleElements();

    // Update text.
    this.updateText();

    // Initialize sounds.
    this.initSounds();

    // Initialize events.
    this.initEvents();
  }

  public update(): void {
    if (this.background) {
      // Scroll background.
      this.background.tilePositionX += BackgroundAttrs.SCROLL;
      this.background.tilePositionY += BackgroundAttrs.SCROLL;
    }

    if (Debug.fps && this.fpsText?.visible) {
      // Update FPS text.
      this.fpsText?.setText(`${__('FPS')}: ${Math.round(this.game.loop.actualFps)}`);
    }
  }

  private initSounds(): void {
    // Initialize sounds.
    this.menuSelectSound = this.sound.add(Sounds.MENU_SELECT);
    this.startGameSound = this.sound.add(Sounds.START_GAME);
    this.gameOverSound = this.sound.add(Sounds.GAME_OVER);
  }

  private initEvents(): void {
    // Handle game state change.
    this.registry.events.on(
      `changedata-${Registry.GAME_STATE}`,
      (parent: Phaser.Data.DataManager, gameState: string) => {
        switch (gameState) {
          case GameStates.STARTED:
          case GameStates.MENU:
            // Toggle HUD elements.
            this.toggleElements();
            break;
          case GameStates.GAME_OVER:
            // Toggle HUD elements.
            this.toggleElements();

            // Show game over container.
            this.addGameOverContainer();
            break;
          default:
            break;
        }
      },
    );
  }

  private toggleElements(): void {
    // Toggle HUD elements.
    const gameState = this.registry.get(Registry.GAME_STATE);
    this.startGameContainer.setVisible(gameState === GameStates.MENU);
    this.controller.setVisible(gameState === GameStates.STARTED);
    this.actionButton.setVisible(gameState === GameStates.STARTED);
    this.escapeButton.setVisible(gameState === GameStates.STARTED);
  }

  private addBackground(): void {
    // Add background.
    this.background = this.add
      .tileSprite(
        0,
        0,
        Number(this.game.config.width) / BackgroundAttrs.SCALE,
        Number(this.game.config.height) / BackgroundAttrs.SCALE,
        Textures.BACKGROUND,
      )
      .setScale(BackgroundAttrs.SCALE)
      .setOrigin(0);
  }

  private addStartGameContainer(): void {
    // Add rectangle.
    const rectangle = this.add
      .rectangle(0, 0, HudAttrs.CONTAINER.WIDTH, HudAttrs.CONTAINER.HEIGHT)
      .setFillStyle(Colors.WHITE.DECIMAL)
      .setStrokeStyle(HudAttrs.CONTAINER.STROKE, Colors.BLACK.DECIMAL)
      .setAlpha(HudAttrs.CONTAINER.ALPHA)
      .setOrigin(0);

    // Add start game text.
    this.startGameText = this.add
      .text(0, HudAttrs.START_GAME.Y, '', {
        ...Font(FontSizes.LARGE),
        color: Colors.BLUE.HEX,
        align: 'center',
        fixedWidth: HudAttrs.CONTAINER.WIDTH,
      })
      .setInteractive()
      .on('pointerdown', () => {
        // Update game state to started.
        this.registry.set(Registry.GAME_STATE, GameStates.STARTED);

        // Play start game sound.
        Util.playSound(this.startGameSound);
      });

    // Add locale images.
    const enFlag = this.addLocaleImage('en', Frames.HUD.FLAGS.EN, HudAttrs.FLAGS.EN.X, HudAttrs.FLAGS.EN.Y);
    const esFlag = this.addLocaleImage(
      'es',
      Frames.HUD.FLAGS.ES,
      HudAttrs.CONTAINER.WIDTH + HudAttrs.FLAGS.ES.X,
      HudAttrs.FLAGS.ES.Y,
    );

    // Add container to scene.
    this.startGameContainer = this.add.container(
      Number(this.game.config.width) / 2 - HudAttrs.CONTAINER.WIDTH / 2,
      Number(this.game.config.height) / 2 - HudAttrs.CONTAINER.HEIGHT / 2,
      [rectangle, this.startGameText, enFlag, esFlag],
    );
  }

  private addGameOverContainer(): void {
    // Add rectangle.
    const rectangle = this.add
      .rectangle(0, 0, HudAttrs.CONTAINER.WIDTH, HudAttrs.CONTAINER.HEIGHT)
      .setFillStyle(Colors.WHITE.DECIMAL)
      .setStrokeStyle(HudAttrs.CONTAINER.STROKE, Colors.BLACK.DECIMAL)
      .setAlpha(HudAttrs.CONTAINER.ALPHA)
      .setOrigin(0);

    // Add game over text.
    const gameOverText = this.add.text(0, HudAttrs.GAME_OVER.Y, __('GAME OVER'), {
      ...Font(FontSizes.LARGE),
      color: Colors.BLUE.HEX,
      align: 'center',
      fixedWidth: HudAttrs.CONTAINER.WIDTH,
    });

    // Add retry text.
    const retryText = this.add
      .text(HudAttrs.RETRY.X, HudAttrs.RETRY.Y, __('RETRY'), {
        ...Font(FontSizes.MEDIUM),
        color: Colors.GREEN.HEX,
        align: 'center',
      })
      .setOrigin(0.5, 1)
      .setInteractive()
      .on('pointerdown', () => {
        // Destroy game over container.
        this.gameOverContainer.destroy();

        // Update game state to started.
        this.registry.set(Registry.GAME_STATE, GameStates.STARTED);

        // Play start game sound.
        Util.playSound(this.startGameSound);
      });

    // Add quit text.
    const quitText = this.add
      .text(HudAttrs.CONTAINER.WIDTH + HudAttrs.QUIT.X, HudAttrs.QUIT.Y, __('QUIT'), {
        ...Font(FontSizes.MEDIUM),
        color: Colors.RED.HEX,
        align: 'center',
      })
      .setOrigin(0.5, 1)
      .setInteractive()
      .on('pointerdown', () => {
        // Destroy game over container.
        this.gameOverContainer.destroy();

        // Update game state to menu.
        this.registry.set(Registry.GAME_STATE, GameStates.MENU);

        // Play menu select sound.
        Util.playSound(this.menuSelectSound);
      });

    // Add container to scene.
    this.gameOverContainer = this.add.container(
      Number(this.game.config.width) / 2 - HudAttrs.CONTAINER.WIDTH / 2,
      Number(this.game.config.height) / 2 - HudAttrs.CONTAINER.HEIGHT / 2,
      [rectangle, gameOverText, retryText, quitText],
    );
  }

  private addLocaleImage(locale: string, frame: number, x: number, y: number): Phaser.GameObjects.Image {
    // Add locale image.
    return this.add
      .image(x, y, Textures.HUD, frame)
      .setScale(6)
      .setOrigin(0.5, 1)
      .setInteractive()
      .on('pointerdown', () => {
        // Update locale.
        Util.updateStorage('locale', locale, this.registry);
        i18n.setLocale(locale);

        // Update text.
        this.updateText();

        // Play menu select sound.
        Util.playSound(this.menuSelectSound);
      });
  }

  private addController(): void {
    // Add controller.
    this.controller = this.add
      .image(HudAttrs.CONTROLLER.X, HudAttrs.CONTROLLER.Y, Textures.HUD, Frames.HUD.CONTROLLER)
      .setScale(HudAttrs.CONTROLLER.SCALE)
      .setInteractive()
      .setOrigin(0, 0.5)
      .on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        // Determine whether left or right side of controller is pressed.
        const bounds = this.controller.getBounds();
        const localX = pointer.worldX - bounds.x;
        const centerX = bounds.width / 2;
        if (localX < centerX - HudAttrs.CONTROLLER.BUTTON_PADDING) {
          this.registry.set(Registry.CONTROLLER, ControllerStates.LEFT);
        } else if (localX > centerX + HudAttrs.CONTROLLER.BUTTON_PADDING) {
          this.registry.set(Registry.CONTROLLER, ControllerStates.RIGHT);
        }
      })
      .on('pointerup', () => {
        // Controller button released.
        this.registry.set(Registry.CONTROLLER, null);
      });
  }

  private addActionButton(): void {
    // Add action button.
    this.actionButton = this.add
      .image(
        Number(this.game.config.width) + HudAttrs.ACTION_BUTTON.X,
        HudAttrs.ACTION_BUTTON.Y,
        Textures.HUD,
        Frames.HUD.ACTION_BUTTON,
      )
      .setScale(HudAttrs.ACTION_BUTTON.SCALE)
      .setOrigin(1, 0.5)
      .setInteractive()
      .on('pointerdown', () => {
        // Action button pressed.
        this.registry.set(Registry.ACTION_BUTTON, true);
      })
      .on('pointerup', () => {
        // Action button released.
        this.registry.set(Registry.ACTION_BUTTON, false);
      });
  }

  private addEscapeButton(): void {
    // Add escape button.
    this.escapeButton = this.add
      .image(HudAttrs.ESCAPE_BUTTON.X, HudAttrs.ESCAPE_BUTTON.Y, Textures.HUD, Frames.HUD.ESCAPE)
      .setScale(HudAttrs.ESCAPE_BUTTON.SCALE)
      .setOrigin(0)
      .setInteractive()
      .on('pointerdown', () => {
        // Update game state to game over.
        this.registry.set(Registry.GAME_STATE, GameStates.GAME_OVER);

        // Play game over sound.
        Util.playSound(this.gameOverSound);
      });
  }

  private addFps(): void {
    // Add FPS if enabled.
    if (Debug.fps) {
      this.fpsText?.destroy();

      this.fpsText = this.add
        .text(Number(this.game.config.width) + HudAttrs.FPS.X, HudAttrs.FPS.Y, '', {
          ...Font(FontSizes.SMALL),
          color: Colors.RED.HEX,
          align: 'center',
        })
        .setOrigin(1, 0);
    }
  }

  private updateText(): void {
    // Update start game text.
    if (this.startGameText?.visible) {
      this.startGameText?.setText(__('START GAME'));
    }
  }
}
