export const Constants = {
  GAME: {
    STATES: {
      MENU: 'menu',
      STARTED: 'started',
      GAME_OVER: 'game-over',
    },
  },
  PLAYER: {
    SCALE: 5,
    X: 960,
    Y: 700,
    HITBOX: {
      WIDTH: 32,
      HEIGHT: 32,
    },
    FRAME_RATE: 10,
    ANIMATIONS: {
      RUN: 'run',
    },
  },
  BACKGROUND: {
    SCALE: 2,
    SCROLL: -1,
  },
  GROUND: {
    SCALE: 3,
    X: 0,
    Y: 700,
    HEIGHT: 32,
    SCROLL: 1,
  },
  HUD: {
    CONTAINER: {
      X: 384,
      Y: 324,
      WIDTH: 1152,
      HEIGHT: 432,
      STROKE: 5,
      ALPHA: 0.6,
    },
    START_GAME: {
      X: 576,
      Y: 120,
    },
    EN_FLAG: {
      X: 384,
      Y: 312,
    },
    ES_FLAG: {
      X: 768,
      Y: 312,
    },
    GAME_OVER: {
      X: 576,
      Y: 120,
    },
    RETRY: {
      X: 384,
      Y: 312,
    },
    QUIT: {
      X: 768,
      Y: 312,
    },
    ESCAPE: {
      X: 20,
      Y: 20,
    },
    FPS: {
      X: 1900,
      Y: 20,
    },
  },
};
