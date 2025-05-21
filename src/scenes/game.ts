import { World } from '.';
import { Obstacle, Player } from '../objects';
import { Util } from '../util';
import { BaseScene } from './base-scene';

export class Game extends BaseScene {
  static readonly SCORE_INCREMENT_TIME = 100;
  static readonly SCORE_INCREMENT_VALUE = 1;
  static readonly START_VELOCITY = 20;
  static readonly VELOCITY_INCREMENT_VALUE = 2;
  static readonly OBSTACLE_FREQUENCY = 1500;
  static readonly DIFFICULTY_INCREASE_TIME = 5000;

  private player: Player;
  private obstacles: Phaser.GameObjects.Group;
  private obstacleVelocity: number;

  constructor() {
    super('Game');
  }

  public create(): void {
    super.create();

    // Add player.
    this.player = new Player({
      scene: this,
    });

    // Initialize obstacles.
    this.obstacleVelocity = Game.START_VELOCITY;
    this.obstacles = this.add.group({
      runChildUpdate: true,
    });

    // Add new obstacle.
    this.time.addEvent({
      delay: Game.OBSTACLE_FREQUENCY,
      loop: true,
      callback: this.addObstacle,
      callbackScope: this,
    });

    // Increase game difficulty.
    this.time.addEvent({
      delay: Game.DIFFICULTY_INCREASE_TIME,
      loop: true,
      callback: () => {
        this.obstacleVelocity += Game.VELOCITY_INCREMENT_VALUE;
      },
    });

    // Add colliders between player / obstacles and ground.
    const world = this.scene.get('World') as World;
    this.physics.add.collider(this.player, world.getGroundCollider());
    this.physics.add.collider(this.obstacles, world.getGroundCollider());

    // Initialize score.
    this.registry.set('score', 0);

    // Increment score.
    this.time.addEvent({
      delay: Game.SCORE_INCREMENT_TIME,
      callback: () => {
        this.registry.inc('score', Game.SCORE_INCREMENT_VALUE);
      },
      callbackScope: this,
      loop: true,
    });

    // Initialize game over.
    this.registry.set('game-over', false);

    // Check for collision between player and obstacle.
    const collider = this.physics.add.overlap(this.player, this.obstacles, async () => {
      // Destroy collider.
      collider.destroy();

      // Set game over.
      this.registry.set('game-over', true);

      // Play game over sound.
      Util.playSound(this, 'game-over');

      // Check if score is a high score.
      const score = this.registry.get('score');
      const highScore = (await Util.getSetting('high-score', this.registry)) || 0;
      if (score > highScore) {
        // Update high score.
        await Util.updateSetting('high-score', score, this.registry);

        // Update high score on HUD.
        this.scene.get('Hud').events.emit('update-high-score');
      }
    });
  }

  public update(): void {
    // Update player.
    this.player.update();
  }

  private addObstacle(): void {
    // Add obstacle.
    this.obstacles.add(
      new Obstacle({
        scene: this,
        velocity: this.obstacleVelocity,
      }),
    );
  }
}
