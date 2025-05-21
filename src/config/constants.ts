export const Registry = {
  GAME_STATE: 'game-state',
  JOYSTICK: 'joystick',
  ACTION_BUTTON: 'action-button',
};

export const GameStates = {
  MENU: 'menu',
  STARTED: 'started',
  GAME_OVER: 'game-over',
};

export const ActionButtonStates = {
  PRESSED: 'pressed',
};

export const PlayerAttrs = {
  SCALE: 8,
  X: 1250,
  Y: 800,
  HITBOX: {
    WIDTH: 20,
    HEIGHT: 32,
  },
  VELOCITY: {
    MOVE: 500,
    JUMP: -1000,
  },
  FRAME_RATE: 10,
};

export const CameraAttrs = {
  LERP: {
    X: 0.05,
    Y: 0,
  },
};

export const BackgroundAttrs = {
  FAR: {
    SCALE: 8,
    SCROLL: {
      MENU: 0.3,
      GAME: 0.05,
    },
  },
  NEAR: {
    SCALE: 6,
    SCROLL: {
      MENU: 1,
      GAME: 0.15,
    },
  },
};

export const GroundAttrs = {
  SCALE: 8,
  Y: 1000,
  LENGTH: 500,
};

export const KillZoneAttrs = {
  OVERHANG: 1000,
  THICKNESS: 50,
  GAP: 500,
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
    SCALE: 8,
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
  JOYSTICK: {
    SCALE: 16,
    X: 125,
    Y: -200,
    RADIUS: 25,
  },
  ACTION_BUTTON: {
    SCALE: 16,
    X: -125,
    Y: -200,
  },
  ESCAPE_BUTTON: {
    SCALE: 10,
    X: 30,
    Y: 30,
  },
  FPS: {
    X: -30,
    Y: 30,
  },
};
