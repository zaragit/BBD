import { generateDragCall } from '../lib/utils';
import * as d3 from 'd3';

export enum BBDTypes {
  CIRCLE = 'circle',
  RECT = 'rect',
  HEXAGON = 'hexagon',
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
  x: number;
  y: number;
  width: number;
}

export class TextBox implements TextData, SvgRenderer {
  text: string | null | undefined;
  x: number;
  y: number;
  width: number;

  constructor(text: string | null | undefined) {
    this.text = text;
  }

  render(
    selection: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
  ): void {
    selection
      .append('div')
      .attr(
        'style',
        `padding-top:${this.y}px; margin-left:${this.x}px; display: flex; align-items: unsafe center; justify-content: unsafe center; width: ${this.width}px;`
      )
      .append('div')
      .attr('style', `box-sizing: border-box; text-align: center;`)
      .append('div')
      .attr('style', `pointer-events: all; line-height: 1.2;`)
      .text(this.text);
  }

  setX(x: number): void {
    this.x = x;
  }

  setY(y: number): void {
    this.y = y;
  }

  setWidth(width: number): void {
    this.width = width;
  }
}

interface SvgRenderer {
  render(
    selection:
      | d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
      | d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
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
    } else if (attribute.r) {
      this.width = attribute.r * 2;
    }

    if (attribute.height) {
      this.height = attribute.height;
    }
  }

  abstract render(
    selection: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
  );

  setX(x: number): void {
    this.x = x;
  }

  setY(y: number): void {
    this.y = y;
  }
}

export class BlockHexagon extends Block {
  render(
    selection: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
  ): void {
    const _this = this;

    selection
      .selectAll('path.area')
      .data([this.getHexData()])
      .enter()
      .append('path')
      .style('fill', '#ffFFFF')
      .style('stroke', 'gray')
      .attr('d', d3.line())
      .call(
        generateDragCall(
          (
            blockSelection: d3.Selection<any, unknown, null, undefined>,
            coord
          ) => {
            _this.setX(_this.x - coord.x);
            _this.setY(_this.y - coord.y);

            blockSelection.data([this.getHexData()]).attr('d', d3.line());
          }
        )
      );
  }

  getHexData() {
    const x = this.x;
    const y = this.y;
    const quarterWidth = this.width / 4;
    const halfHeight = this.height / 2;
    return [
      [quarterWidth + x, 0 + y],
      [0 + x, halfHeight + y],
      [quarterWidth + x, this.height + y],
      [quarterWidth * 3 + x, this.height + y],
      [this.width + x, halfHeight + y],
      [quarterWidth * 3 + x, 0 + y],
      [quarterWidth + x, 0 + y],
    ];
  }
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
            _this.setX(_this.x - coord.x);
            _this.setY(_this.y - coord.y);

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

    this.text.setWidth(this.width);
  }
}

export const createBlock = (data: BlockAttribute): Block => {
  switch (data.type) {
    case BBDTypes.CIRCLE:
      return new BlockCircle(data);
    case BBDTypes.RECT:
      return new BlockRect(data);
    case BBDTypes.HEXAGON:
      return new BlockHexagon(data);
  }
};
