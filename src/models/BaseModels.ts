export interface BlockData {
  x: number;
  y: number;
  width?: number;
  height?: number;
  r?: number;
  text?: string;
}

export interface CanvasOptions {
  rootEl?: string;
  width: number | string;
  height: number | string;
}
