import { __ } from 'i18n-for-browser';
import { BaseScene } from '.';
import { Colors, Debug, FontSizes, Properties } from '../config';
import { GuiContainer, GuiText } from '../gui';
import { Util } from '../util';

export class Overlay extends BaseScene {
  private gameOverContainer: Phaser.GameObjects.Container;

  constructor() {
    super('Overlay');
  }

  public async create(): Promise<void> {
    super.create();

    // Initialize events.
    this.initEvents();
  }

  private initEvents(): void {
    // Show game over container if game is over.
    this.registry.events.on('changedata-game-over', (parent: Phaser.Data.DataManager, gameOver: boolean) => {
      if (gameOver) {
        this.scene.pause('Game');
        this.showGameOverContainer();
      }
    });
  }

  private showGameOverContainer(): void {
    // Don't show game over container more than once.
    if (this.gameOverContainer?.active) {
      return;
    }

    // Add game over title text.
    const gameOverTitleText = GuiText.addText({
      scene: this.scene.scene,
      x: Properties.width * 0.3,
      y: Properties.height * 0.025,
      text: __('GAME OVER'),
      fontSize: FontSizes.LARGE,
      align: 'center',
      color: Colors.RED.HEX,
      origin: {
        x: 0.5,
        y: 0,
      },
    });

    // Add play again confirmation text.
    const playAgainText = GuiText.addText({
      scene: this.scene.scene,
      x: Properties.width * 0.3,
      y: Properties.height * 0.2,
      text: `${__('PLAY AGAIN')}?`,
      fontSize: FontSizes.MEDIUM,
      align: 'center',
      color: Colors.BLUE.HEX,
      origin: {
        x: 0.5,
        y: 0.5,
      },
    });

    // Add play again yes text.
    const playAgainYesText = GuiText.addText({
      scene: this.scene.scene,
      x: Properties.width * 0.18,
      y: Properties.height * 0.32,
      text: __('YES'),
      fontSize: FontSizes.MEDIUM,
      align: 'center',
      color: Colors.GREEN.HEX,
      origin: {
        x: 0.5,
        y: 0.5,
      },
    }).on('pointerdown', () => {
      // Restart game.
      this.quitGame(true);

      // Play menu select sound.
      Util.playSound(this, 'menu-select');
    });

    // Add play again no text.
    const playAgainNoText = GuiText.addText({
      scene: this.scene.scene,
      x: Properties.width * 0.42,
      y: Properties.height * 0.32,
      text: __('NO'),
      fontSize: FontSizes.MEDIUM,
      align: 'center',
      color: Colors.RED.HEX,
      origin: {
        x: 0.5,
        y: 0.5,
      },
    }).on('pointerdown', () => {
      // Quit game.
      this.quitGame(false);

      // Play menu select sound.
      Util.playSound(this, 'menu-select');
    });

    // Add game over container.
    this.gameOverContainer = GuiContainer.addContainer({
      scene: this.scene.scene,
      x: Properties.width * 0.2,
      y: Properties.height * 0.3,
      width: Properties.width * 0.6,
      height: Properties.height * 0.4,
      alpha: 0.6,
      elements: [gameOverTitleText, playAgainText, playAgainYesText, playAgainNoText],
    });
  }

  private quitGame(restart: boolean): void {
    // Quit game.
    this.scene.stop('Game');
    this.registry.destroy();
    this.gameOverContainer?.destroy();

    if (restart || Debug.disableMenu) {
      // Restart game.
      this.scene.get('Hud').events.emit('start-game');
    } else {
      // Return to menu.
      this.scene.get('Hud').events.emit('show-menu');
    }
  }
}
