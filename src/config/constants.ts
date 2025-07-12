export const Registry = {
  GAME_STATE: 'game-state',
  CONTROLLER: 'controller',
  ACTION_BUTTON: 'action-button',
};

export const GameStates = {
  MENU: 'menu',
  STARTED: 'started',
  GAME_OVER: 'game-over',
};

export const ControllerStates = {
  LEFT: 'left',
  RIGHT: 'right',
};

export const ActionButtonStates = {
  PRESSED: 'pressed',
};

export const PlayerAttrs = {
  SCALE: 5,
  X: 540,
  Y: 1100,
  HITBOX: {
    WIDTH: 32,
    HEIGHT: 32,
  },
  VELOCITY: {
    MOVE: 500,
    JUMP: -1000,
  },
  FRAME_RATE: 10,
};

export const BackgroundAttrs = {
  SCALE: 2,
  SCROLL: -1,
};

export const GroundAttrs = {
  SCALE: 3,
  Y: 1200,
};

export const HudAttrs = {
  CONTAINER: {
    WIDTH: 864,
    HEIGHT: 576,
    STROKE: 5,
    ALPHA: 0.6,
  },
  START_GAME: {
    Y: 100,
  },
  FLAGS: {
    EN: {
      X: 250,
      Y: 476,
    },
    ES: {
      X: -250,
      Y: 476,
    },
  },
  GAME_OVER: {
    Y: 100,
  },
  RETRY: {
    X: 250,
    Y: 476,
  },
  QUIT: {
    X: -250,
    Y: 476,
  },
  CONTROLLER: {
    SCALE: 15,
    X: 100,
    Y: 1600,
    BUTTON_PADDING: 20,
  },
  ACTION_BUTTON: {
    SCALE: 10,
    X: -100,
    Y: 1600,
  },
  ESCAPE_BUTTON: {
    SCALE: 8,
    X: 30,
    Y: 30,
  },
  FPS: {
    X: -30,
    Y: 30,
  },
};
