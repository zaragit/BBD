import * as d3 from 'd3';
import { CanvasOptions, BlockData } from './models/BaseModels';

export default {
  loadCanvas: function (options: CanvasOptions) {
    if (options.width == null || options.height == null) {
      throw '캔버스 width, height 지정 필수!';
    }

    return d3
      .select(options.rootEl ? options.rootEl : 'body')
      .append('svg')
      .attr('width', options.width)
      .attr('height', options.height);
  },
  renderBlock: function (datas: BlockData[]) {
    console.log(datas);
  },
};
