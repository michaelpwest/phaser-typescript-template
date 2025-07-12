# Phaser 4 TypeScript Template

**A Phaser 4 + TypeScript + Vite template optimized for development and deployment of mobile and web games.**

[Demo](#demo) |
[Template features](#template-features) |
[Installation](#installation) |
[Development](#development) |
[Mobile deployment](#mobile-deployment) |
[Web deployment](#web-deployment)

[![License: MIT](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Phaser](https://img.shields.io/badge/Phaser-FF69B4)](https://phaser.io/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?logo=capacitor&logoColor=white)](https://capacitorjs.com/)

---

This Phaser 4 template can be used by developers who want to build and deploy mobile games using [Phaser 4](https://phaser.io/) and [TypeScript](https://typescriptlang.org/). The template includes a range of useful features such as mobile deployment with a custom app icon, responsive scaling for all screen sizes, persistent storage, multiple locales support, and debugging options.

A basic sample game is included to help you get started building your own.

A big thank you to
[Kenney Assets](https://kenney.nl/assets/), [Pixel Frog](https://pixelfrog-assets.itch.io/), and
[lukasfdahl](https://lukasfdahl.itch.io/) for providing the graphics and sounds for the game.

## 💻 Demo <a id="demo"></a>

A demo of the game is available under https://mwestapps.com/phaser-demo/.

## ✨ Template features <a id="template-features"></a>

### Frameworks

- **TypeScript:** The game is fully written in [TypeScript](https://typescriptlang.org/).
- **Phaser:** The game uses the [Phaser](https://phaser.io/) game development framework.
- **Vite:** [Vite](https://vite.dev/) is used as the local development server, allowing for automatic reloading when files are modified.
- **Code standards:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), and [EditorConfig](https://editorconfig.org/) are used to keep the code adhering to its defined rules. When committing changes to Git, [lint-staged](https://github.com/lint-staged/lint-staged/) will confirm that everything is correct before allowing the commit.

### Game

Use on-screen controls to move and jump a character. The game includes animations and sounds to demonstrate their implementation and includes start and end game functionality.

### Mobile Support

- **Deploy to mobile:** [Capacitor by Ionic](https://capacitorjs.com/) is used for mobile deployment, with commands like `npm run deploy:ios` and `npm run deploy:android` available for simple mobile deployment.
- **App icon:** An app icon can be added to `resources/icon.png` and will be generated in the necessary formats for iOS or Android when deploying to mobile.
- **Persistent mobile storage:** Mobile storage is supported for saving data such as the selected locale.
- **Scaling to mobile:** Any mobile device will scale and display the game correctly, setting up a playable area using a 9:16 aspect ratio.

### Locales

- **Multiple locales:** English and Spanish translations have been added to the game. Additional locales can be added to the `src/locales/` directory and configured under `src/index.ts`.

### Debug

Under `src/config/debug.ts` you can toggle the following debug options:

- **Disable sound:** You can disable sounds by setting `disableSound: true`.
- **FPS:** The game will be locked to 60 FPS and you can enable the FPS counter by setting `fps: true`.
- **Physics:** You can enable physics graphics such as hit boxes by setting `physics: true`.

## 🛠️ Installation <a id="installation"></a>

Install the dependencies with:

```
npm install
```

## 💾 Development <a id="development"></a>

Start the development server with:

```
npm run dev
```

Once the game is running, open your browser and go to:

```
localhost:3000
```

Any changes you make will automatically reload the development server.

## 📱 Mobile deployment <a id="mobile-deployment"></a>

If you use this template for building a new game, make sure the game is deployed with the correct name, version, and app icon:

- Confirm everything is correct under `package.json`. The fields `name` and `version` are the most important to verify.
- Make sure `capacitor.config.ts` has the correct `appId` and `appName`.
- Add an app icon to `resources/icon.png`.

[Capacitor by Ionic](https://capacitorjs.com/) is used for mobile deployment and depending on which mobile operating system you wish to deploy to, you can create the [Xcode](https://developer.apple.com/xcode/) or [Android Studio](https://developer.android.com/studio/) project with:

```
npx cap add ios
npx cap add android
```

You can open the project to make any changes directly in [Xcode](https://developer.apple.com/xcode/) or [Android Studio](https://developer.android.com/studio/):

```
npx cap open ios
npx cap open android
```

To deploy to either mobile operating system you can run:

```
npm run deploy:ios
npm run deploy:android
```

## 🌐 Web deployment <a id="web-deployment"></a>

To deploy the game to a web server you can run:

```
npm run build
```

The build output will be placed in the `dist/` directory and can be uploaded to a web server.
