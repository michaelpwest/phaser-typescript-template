import { Preferences } from '@capacitor/preferences';
import { Debug } from '../config';

export class Util {
  public static async getStorage(key: string, registry: Phaser.Data.DataManager): Promise<string | null> {
    // Get an item from storage.
    const { value } = await Preferences.get({ key });
    registry.set(key, value);

    return value;
  }

  public static updateStorage(key: string, value: string, registry: Phaser.Data.DataManager): void {
    // Update an item in storage.
    Preferences.set({
      key,
      value: value.toString(),
    });
    registry.set(key, value);
  }

  public static playSound(sound: Phaser.Sound.BaseSound): void {
    // Play sound if sound is enabled and not already playing.
    if (!Debug.disableSound && !sound.isPlaying) {
      sound.play();
    }
  }

  public static stopSound(sound: Phaser.Sound.BaseSound): void {
    // Stop sound if sound is enabled and already playing.
    if (!Debug.disableSound && sound.isPlaying) {
      sound.stop();
    }
  }
}
