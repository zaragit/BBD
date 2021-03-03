import { BlockProps, SVGBlock, SVGProps } from '.';

export class TextBox implements SVGBlock {
  props: BlockProps;

  constructor(props: BlockProps) {
    this.props = props;
  }

  svg(): SVGProps {
    return {};
  }
}
