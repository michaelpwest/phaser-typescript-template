  # Phaser TypeScript Template

**A Phaser 3 + TypeScript + Vite template optimized for development and deployment of mobile and web games.**

[Demo](#demo) |
[Template features](#template-features) |
[Installation](#installation) |
[Development](#development) |
[Web deployment](#web-deployment) |
[Mobile deployment](#mobile-deployment)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Framework: Phaser 3](https://img.shields.io/badge/Framework-Phaser%203-ff69b4)](https://phaser.io/)
[![Language: TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6)](https://typescriptlang.org/)
[![Development Server: Vite](https://img.shields.io/badge/Development%20Server-Vite-646CFF)](https://vite.dev/)
[![Mobile Deployment: Capacitor](https://img.shields.io/badge/Mobile%20Deployment-Capacitor-119EFF)](https://capacitorjs.com/)

---

I created this Phaser 3 template for developers who want to build and deploy mobile games using [Phaser 3](https://phaser.io/) and [TypeScript](https://typescriptlang.org/). The template includes a range of useful features such as mobile deployment with a custom app icon, responsive scaling for all screen sizes, persistent settings storage, multiple locales support, and debugging options.

The default game is a simple bouncing DVD logo that you can control, with the goal of hitting the screen corners.

## 💻 Demo <a id="demo"></a>

A demo of the game is available under https://mwestapps.com/phaser-demo/

## ✨ Template features <a id="template-features"></a>

### Frameworks

- **TypeScript:** The game is fully written in [TypeScript](https://typescriptlang.org/).
- **Vite:** [Vite](https://vite.dev/) is used as the local development server, allowing for automatic reloading when files are modified.
- **Code standards:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), and [EditorConfig](https://editorconfig.org/) are used to keep the code adhering to its defined rules. When committing changes to Git, [lint-staged](https://github.com/lint-staged/lint-staged/) will confirm that everything is correct before allowing the commit.

### Mobile Support

- **Deploy to mobile:** [Capacitor by Ionic](https://capacitorjs.com/) is used for mobile deployment, with commands like `npm run deploy:ios` and `npm run deploy:android` available for simple mobile deployment.
- **App icon:** Your app icon can be added to `resources/icon.png` and will be generated in the necessary formats for iOS or Android when deploying to mobile.
- **Saving settings to mobile:** Mobile storage is supported for saving settings such as the chosen locale.
- **Scaling to mobile:** Any mobile device in landscape will scale and display the game correctly. The HUD will use the entire available space on the mobile device and the game itself will keep itself within a playable area using a 16:9 aspect ratio.

### The Game

- **Controls:** Keyboard and on-screen controls are available for left and right movement.
- **Pause:** The game will pause if you press the pause button or leave the app temporarily.
- **Sprites:** A sprite sheet is used to display the various graphics in the game.
- **Sounds:** A few sounds have been added to demonstrate how to play sounds in a game.

### Locales

- **Multiple locales:** English and Spanish translations have been added to the game. Additional locales can be added to the `src/locales` directory and configured under `src/index.ts`.

### Debug

Under `src/config/debug.ts` you can toggle the following debug options:

- **Disable menu:** You can have the game start automatically without having to select `Start Game` by setting `disableMenu: true`.
- **Disable sound:** You can disable sounds by setting `disableSound: true`.
- **FPS:** The game will be locked to 60 FPS and you can enable the FPS counter by enabling `fps: true`.
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

Any files changes you make will reload the development server automatically.

## 📱 Mobile deployment <a id="mobile-deployment"></a>

If you use this template for building a new game, make sure the game is deployed with the correct name, version, author, and app icon.

- Confirm everything is correct under `package.json`. The fields `name`, `version` and `author` are the most important to verify.
- Make sure `capacitor.config.ts` has the correct `appId` and `appName`.
- Add your app icon to `resources/icon.png`.
- [Capacitor by Ionic](https://capacitorjs.com/) is used for mobile deployment and depending on which mobile operating system you wish to deploy to, you can create the [Xcode](https://developer.apple.com/xcode/) or [Android Studio](https://developer.android.com/studio/) project with:

```
npx cap add ios
npx cap add android
```

- Open the project to make any changes directly in [Xcode](https://developer.apple.com/xcode/) or [Android Studio](https://developer.android.com/studio/):

```
npx cap open ios
npx cap open android
```

- Deploy to either mobile operating system:

```
npm run deploy:ios
npm run deploy:android
```

## 🌐 Web deployment <a id="web-deployment"></a>

To deploy the game to a web server you can run:
```
npm run build
```

The build will be added to the `dist` directory and its contents can be uploaded to your web server.
