import { Preferences } from '@capacitor/preferences';
import { Debug } from '../config';

export class Util {
  public static async getSetting(key: string, registry: Phaser.Data.DataManager): Promise<string | null> {
    // Get a setting.
    const { value } = await Preferences.get({ key });
    registry.set(key, value);
    return value;
  }

  public static updateSetting(key: string, value: string, registry: Phaser.Data.DataManager): void {
    // Update a setting.
    Preferences.set({
      key,
      value: value.toString(),
    });
    registry.set(key, value);
  }

  public static async playSound(scene: Phaser.Scene, sound: string): Promise<void> {
    // Play sound if sound is enabled.
    if (Debug.disableSound) {
      return;
    }
    scene.sound.add(sound).play();
  }
}
