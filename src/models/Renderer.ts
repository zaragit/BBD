import { BlockProps, SVGProps } from '.';
import { Block, createBlock } from './Block';
import { Selection } from './Selection';
import { TextBox } from './Text';
import * as d3 from 'd3';

export class BlockRenderer {
  props: BlockProps;
  block: Block;
  text: TextBox;
  selection: Selection;

  constructor(props: BlockProps) {
    this.props = props;

    this.block = createBlock(props);
    this.text = new TextBox(props);
    this.selection = new Selection(props);
  }

  renderBlock(
    d3Selection: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
    draggable
  ): void {
    const blockSVG = d3Selection
      .append('g')
      .attr('class', 'block')
      .append(this.props.type);
    const blockAttr = this.block.svg();

    Object.keys(blockAttr).forEach((key) => {
      blockSVG.attr(key, blockAttr[key]);
    });
  }

  renderSelection(
    d3Selection: d3.Selection<SVGGElement, unknown, HTMLElement, any>
  ): void {
    const selectionSVG = d3Selection
      .append('g')
      .attr('class', 'selection')
      .append('rect');

    const blockAttr: SVGProps = {
      x: this.props.x,
      y: this.props.y,
      width: this.props.width ? this.props.width : this.props.r * 2,
      height: this.props.height ? this.props.height : this.props.r * 2,
      fill: 'none',
      stroke: 'blue',
    };

    Object.keys(blockAttr).forEach((key) => {
      selectionSVG.attr(key, blockAttr[key]);
    });
  }
}

export class Renderer {
  arrProps: BlockProps[];
  arrRenderers: BlockRenderer[];
  canvas: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;

  constructor(arrProps: BlockProps[]) {
    this.arrProps = arrProps;

    this.arrRenderers = this.arrProps.map((p) => new BlockRenderer(p));
  }
}
