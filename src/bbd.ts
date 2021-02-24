import * as d3 from 'd3';
import { generateD3DragEvent } from './lib/utils';
import { BlockData } from './models/BaseModels';

export default class BBD {
  private rootEl: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  private svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  private textEl: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;

  constructor(rootEl: HTMLElement | string) {
    const id =
      typeof rootEl === 'string'
        ? ('#' + rootEl).replace(/##/, '#')
        : rootEl.id;

    this.rootEl = d3.select(id);

    this.svgEl = this.rootEl
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr(
        'style',
        'left: 0px; top: 0px; position: absolute; background-image: none;'
      );

    this.textEl = this.rootEl
      .append('div')
      .attr('id', 'bbd_tb_container')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr(
        'style',
        'left: 0px; top: 0px; position: absolute; background-image: none;'
      );

    return this;
  }

  renderBlock(datas: BlockData[]): void {
    const items = this.svgEl
      .selectAll()
      .data(datas)
      .enter()
      .append('g')
      .attr('class', 'bl_item');

    items
      .append('g')
      .append('circle')
      .attr('pointer-events', 'all')
      .attr('cx', (d: any) => d.x + d.r)
      .attr('cy', (d: any) => d.y + d.r)
      .attr('r', (d: any) => d.r)
      .attr('fill', 'white')
      .attr('stroke', 'gray')
      .call(
        d3.drag().on(
          'start',
          generateD3DragEvent((selection, event, d) => {
            selection
              .raise()
              .attr('cx', (d.x = event.x) + d.r)
              .attr('cy', (d.y = event.y) + d.r);
          })
        )
      );
  }

  /**
   * Getter
   */
  get RootEl(): d3.Selection<d3.BaseType, unknown, HTMLElement, any> {
    return this.rootEl;
  }

  get SvgEl(): d3.Selection<SVGSVGElement, unknown, HTMLElement, any> {
    return this.svgEl;
  }

  get TextEl(): d3.Selection<HTMLDivElement, unknown, HTMLElement, any> {
    return this.textEl;
  }
}
