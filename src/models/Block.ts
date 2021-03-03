import { BBDTypes, BlockProps, SVGBlock, SVGProps } from '.';

export abstract class Block implements SVGBlock {
  props: BlockProps;

  constructor(props: BlockProps) {
    this.props = props;
  }

  abstract svg(): SVGProps;
}

export class CircleBlock extends Block {
  svg(): SVGProps {
    return {
      cx: this.props.x + this.props.r,
      cy: this.props.y + this.props.r,
      r: this.props.r,
      width: this.props.x * 2,
      height: this.props.y * 2,
      fill: 'white',
      stroke: 'gray',
    };
  }
}

export class RectangleBlock extends Block {
  svg(): SVGProps {
    return {
      x: this.props.x,
      y: this.props.y,
      width: this.props.width,
      height: this.props.height,
      fill: 'white',
      stroke: 'gray',
    };
  }
}

export class HexagonBlock extends Block {
  svg(): SVGProps {
    return {
      x: this.props.x,
      y: this.props.y,
      width: this.props.width,
      height: this.props.height,
      fill: 'white',
      stroke: 'gray',
    };
  }
}

export const createBlock = (data: BlockProps): Block => {
  switch (data.type) {
    case BBDTypes.CIRCLE:
      return new CircleBlock(data);
    case BBDTypes.RECT:
      return new RectangleBlock(data);
    case BBDTypes.HEXAGON:
      return new HexagonBlock(data);
  }
};
