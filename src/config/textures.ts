export const Textures = {
  BACKGROUND: {
    NAME: 'background',
    FILE: 'assets/images/background.png',
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
      FRAMES: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    RUN: {
      NAME: 'run',
      FRAMES: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    },
    JUMP: {
      NAME: 'jump',
      FRAMES: [24],
    },
    FALL: {
      NAME: 'fall',
      FRAMES: [36],
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
