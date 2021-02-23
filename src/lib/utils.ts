import * as d3 from 'd3';

export const generateD3DragEvent = (callBack) => {
  return function started(event) {
    var selection = d3.select(this).classed('dragging', true);

    event.on('drag', dragged).on('end', ended);

    function dragged(event, d) {
      callBack(selection, event, d);
    }

    function ended() {
      selection.classed('dragging', false);
    }
  };
};
