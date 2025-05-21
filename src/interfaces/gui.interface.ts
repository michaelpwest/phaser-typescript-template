export interface GuiTextInterface {
  scene: Phaser.Scene;
  x: number;
  y: number;
  text: string;
  fontSize: number;
  lineSpacing?: number;
  align?: string;
  color?: string;
  origin?: {
    x: number;
    y: number;
  };
}

export interface GuiImageInterface {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string;
  frame: number;
  color?: number;
  alpha?: number;
  scale?: number;
  origin?: {
    x: number;
    y: number;
  };
}

export interface GuiContainerInterface {
  scene: Phaser.Scene;
  x: number;
  y: number;
  width: number;
  height: number;
  alpha?: number;
  elements?: Array<Phaser.GameObjects.Text | Phaser.GameObjects.Image | Phaser.GameObjects.Sprite>;
}
