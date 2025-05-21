import { App } from '@capacitor/app';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { StatusBar } from '@capacitor/status-bar';
import i18n from 'i18n-for-browser';
import Phaser from 'phaser';
import { Config } from './config';
import en from './locales/en.json';
import es from './locales/es.json';
import { Util } from './util';

let game: Phaser.Game;

(async () => {
  try {
    // Lock screen orientation as landscape.
    await ScreenOrientation.lock({ orientation: 'landscape' });

    // Hide status bar.
    await StatusBar.hide();
  } catch (error) {
    console.error(error);
  }

  // Load game instance.
  game = new Phaser.Game(Config);

  // Initialize locales.
  await initLocales();
})();

// Pause and resume game when P key is pressed.
window.addEventListener('keydown', (e) => {
  if (!e.repeat && e.key == 'p') {
    if (game.scene.isPaused('Game')) {
      resumeGame();
    } else if (game.scene.isActive('Game')) {
      pauseGame();
    }
  }
});

// Pause game when window loses focus.
window.addEventListener('blur', () => {
  if (game.scene.isActive('Game')) {
    pauseGame();
  }
});

// Pause game when app loses focus.
App.addListener('appStateChange', ({ isActive }: { isActive: boolean }) => {
  if (!isActive && game.scene.isActive('Game')) {
    pauseGame();
  }
});

// Pause or minimize game when back button is pressed.
App.addListener('backButton', () => {
  if (game.scene.isActive('Game')) {
    // Pause game.
    pauseGame();
  } else {
    // Minimize game.
    App.minimizeApp();
  }
});

// Restart Hud scene on resize.
window.addEventListener('resize', () => {
  const hudScene = game.scene.getScene('Hud').scene;
  if (hudScene.isActive()) {
    hudScene.restart();
  }
});

function pauseGame() {
  // Pause game.
  game.scene.pause('Game');
}

function resumeGame() {
  // Resume game.
  game.scene.resume('Game');
}

async function initLocales() {
  // Initialize i18n.
  await i18n.configure({
    locales: {
      en,
      es,
    },
    defaultLocale: 'en',
  });

  // Get locale setting.
  let locale = await Util.getSetting('locale', game.registry);

  // Set to default locale if no locale setting is found.
  if (!locale) {
    locale = 'en';
    Util.updateSetting('locale', locale, game.registry);
  }

  // Set game locale.
  await i18n.setLocale(locale);
}
