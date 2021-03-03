export enum BBDTypes {
  CIRCLE = 'circle',
  RECT = 'rect',
  HEXAGON = 'hexagon',
}

export interface BlockProps {
  type: BBDTypes;
  x: number;
  y: number;
  r?: number;
  width: number;
  height: number;
  text: string;
}

export interface SVGProps {
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  r?: number;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

export interface SVGBlock {
  svg(): SVGProps;
}
