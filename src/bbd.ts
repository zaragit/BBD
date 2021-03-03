import * as d3 from 'd3';
import { BlockProps } from './models';
import { BlockRenderer } from './models/Renderer';

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
  private root: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  private canvas: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;

  /**
   * Options
   */
  private draggable: boolean = false;

  private arrProps: BlockProps[];
  private arrRenderers: BlockRenderer[];

  constructor(rootEl: HTMLElement | string, arrProps: BlockProps[]) {
    this.arrProps = arrProps;

    this.arrRenderers = this.arrProps.map((p) => new BlockRenderer(p));

    this.root = d3.select(
      '#' + (typeof rootEl === 'string' ? rootEl.replace(/#/, '') : rootEl.id)
    );

    this.canvas = this.root
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr(
        'style',
        'left: 0px; top: 0px; position: absolute; background-image: none;'
      );

    return this;
  }

  setDraggable(draggable: boolean): BBDBuilder {
    this.draggable = draggable;
    return this;
  }

  /**
   * render
   */
  renderBlock(): void {
    this.arrRenderers.forEach((renderer: BlockRenderer): void => {
      const d3Selection: d3.Selection<
        SVGGElement,
        unknown,
        HTMLElement,
        any
      > = this.canvas.append('g').attr('class', 'block_container');

      renderer.renderBlock(d3Selection, this.draggable);

      renderer.renderSelection(d3Selection);
    });
  }
}
