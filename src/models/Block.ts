import { generateDragCall } from '../lib/utils';

export enum BBDTypes {
  CIRCLE = 'circle',
  RECT = 'rect',
}

export interface BlockAttribute {
  type: BBDTypes;
  x: number;
  y: number;
  text: string | null | undefined;
  r?: number;
  width?: number;
  height?: number;
}

export interface TextData {
  text: string;
}

export class TextBox implements TextData {
  text: string | null | undefined;
  constructor(text: string | null | undefined) {
    this.text = text;
  }
}

interface SvgRenderer {
  render(
    selection: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
  ): void;
}

export abstract class Block implements SvgRenderer {
  type: BBDTypes;
  x: number;
  y: number;
  text: TextBox;
  r?: number;
  width?: number;
  height?: number;

  constructor(attribute: BlockAttribute) {
    this.type = attribute.type;
    this.x = attribute.x;
    this.y = attribute.y;
    this.text = new TextBox(attribute.text);

    if (attribute.r) {
      this.r = attribute.r;
    }

    if (attribute.width) {
      this.width = attribute.width;
    }

    if (attribute.height) {
      this.height = attribute.height;
    }
  }

  abstract render(
    selection: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
  );
}

export class BlockCircle extends Block {
  render(
    selection: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
  ): void {
    const _this = this;
    selection
      .append('g')
      .attr('class', 'bl_item')
      .attr('pointer-events', 'all')
      .append(this.type)
      .attr('cx', this.x + this.r)
      .attr('cy', this.y + this.r)
      .attr('r', this.r)
      .attr('fill', 'white')
      .attr('stroke', 'gray')
      .call(
        generateDragCall(
          (
            blockSelection: d3.Selection<any, unknown, null, undefined>,
            coord
          ) => {
            _this.x -= coord.x;
            _this.y -= coord.y;
            blockSelection
              .attr('cx', this.x + this.r)
              .attr('cy', _this.y + this.r);
          }
        )
      );
  }
}

export class BlockRect extends Block {
  render(
    selection: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
  ): void {
    const _this = this;
    selection
      .append('g')
      .attr('class', 'bl_item')
      .attr('pointer-events', 'all')
      .append(this.type)
      .attr('x', this.x)
      .attr('y', this.y)
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('fill', 'white')
      .attr('stroke', 'gray')
      .call(
        generateDragCall(
          (
            blockSelection: d3.Selection<any, unknown, null, undefined>,
            coord
          ) => {
            _this.x -= coord.x;
            _this.y -= coord.y;
            blockSelection.attr('x', _this.x).attr('y', _this.y);
          }
        )
      );
  }
}

export const createBlock = (data: BlockAttribute): Block => {
  switch (data.type) {
    case BBDTypes.CIRCLE:
      return new BlockCircle(data);
    case BBDTypes.RECT:
      return new BlockRect(data);
  }
};
