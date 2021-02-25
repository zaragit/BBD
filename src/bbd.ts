import * as d3 from 'd3';
import { generateD3DragEvent } from './lib/utils';
import { Block, BlockAttribute, createBlock } from './models/Block';

/**
 * BBD Builder
 *  1. create
 *  2. sketch svg
 *  3. event & options setting
 *  4. render
 */
export default class BBDBuilder {
  /**
   * Selection
   */
  private rootEl: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  private svgEl: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  private textEl: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;

  /**
   * Init Data
   */
  private datas: BlockAttribute[];
  private blocks: Block[] = [];

  /**
   * Options
   */
  private drag: boolean = false;
  private click: boolean = false;

  /**
   * create
   * @param rootEl
   * @param datas
   */
  constructor(rootEl: HTMLElement | string, datas: BlockAttribute[]) {
    this.datas = datas;

    const id =
      typeof rootEl === 'string'
        ? ('#' + rootEl).replace(/##/, '#')
        : rootEl.id;

    this.rootEl = d3.select(id);

    datas.forEach((d) => {
      this.blocks.push(createBlock(d));
    });

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
      .attr(
        'style',
        'left: 0px; top: 0px; position: absolute; background-image: none; width: 100%; height: 100%; pointer-events: none;'
      );

    return this;
  }

  /**
   * activate events
   */
  setDragEvent(): void {
    this.drag = true;
  }
  setClickEvent(): void {
    this.click = true;
  }

  /**
   * render
   */
  renderBlock(): void {
    this.blocks.forEach((block: Block): void => {
      block.render(this.svgEl);

      if (block.text) block.text.render(this.textEl);
    });
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

  /**
   * export datas
   */
  getDatas(): BlockAttribute[] {
    return this.datas;
  }
}
