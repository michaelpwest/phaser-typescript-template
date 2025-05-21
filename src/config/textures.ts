export const Textures = {
  BACKGROUND: {
    FAR: {
      NAME: 'background-far',
      FILE: 'assets/images/background-far.png',
    },
    NEAR: {
      NAME: 'background-near',
      FILE: 'assets/images/background-near.png',
    },
  },
  GROUND: {
    NAME: 'ground',
    FILE: 'assets/images/ground.png',
  },
  PLAYER: {
    NAME: 'player',
    FILE: 'assets/images/player.png',
  },
  HUD: {
    NAME: 'hud',
    FILE: 'assets/images/hud.png',
  },
};

export const Animations = {
  PLAYER: {
    IDLE: {
      NAME: 'idle',
      FRAMES: [0, 1, 2, 3],
    },
    RUN: {
      NAME: 'run',
      FRAMES: [6, 7, 8, 9, 10, 11],
    },
    JUMP: {
      NAME: 'jump',
      FRAMES: [12],
    },
    FALL: {
      NAME: 'fall',
      FRAMES: [18],
    },
  },
};

export const Frames = {
  HUD: {
    JOYSTICK: 0,
    JOYSTICK_THUMB: 1,
    ACTION_BUTTON: 2,
    ESCAPE: 3,
    FLAGS: {
      EN: 4,
      ES: 5,
    },
  },
};
