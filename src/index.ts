import { App } from '@capacitor/app';
import i18n from 'i18n-for-browser';
import Phaser from 'phaser';
import { Config } from './config';
import en from './locales/en.json';
import es from './locales/es.json';
import { Util } from './util';

let game: Phaser.Game;

(async () => {
  // Initialize font.
  await initFont();

  // Load game instance.
  game = new Phaser.Game(Config);

  // Initialize locales.
  await initLocales();

  // Initialize events.
  initEvents();
})();

async function initFont() {
  const font = new FontFace('PressStart2P', `url(assets/fonts/PressStart2P.ttf)`);
  const loadedFont = await font.load();
  document.fonts.add(loadedFont);
  await document.fonts.ready;
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
  let locale = await Util.getStorage('locale', game.registry);

  // Set to default locale if no locale setting is found.
  if (!locale) {
    locale = 'en';
    Util.updateStorage('locale', locale, game.registry);
  }

  // Set game locale.
  await i18n.setLocale(locale);
}

function initEvents() {
  // Quit and minimize game when back button is pressed.
  App.addListener('backButton', () => {
    App.minimizeApp();
  });
}
