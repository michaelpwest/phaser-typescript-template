export const TextureFiles = {
  BACKGROUND: 'assets/images/background.png',
  GROUND: 'assets/images/ground.png',
  PLAYER: 'assets/images/player.png',
  HUD: 'assets/images/hud.png',
};

export const Textures = {
  BACKGROUND: 'background',
  GROUND: 'ground',
  PLAYER: 'player',
  HUD: 'hud',
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
    CONTROLLER: 0,
    ACTION_BUTTON: 1,
    ESCAPE: 2,
    FLAGS: {
      EN: 3,
      ES: 4,
    },
  },
};
