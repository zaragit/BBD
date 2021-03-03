import * as d3 from 'd3';
import { DragBehavior } from 'd3';

/**
 * create d3 drag event
 * @param callBack
 */
export const generateD3DragEvent = (callBack: Function) => {
  return function started(event) {
    const selection: d3.Selection<any, unknown, null, undefined> = d3
      .select(this)
      .classed('dragging', true);
    let sX: number = event.x;
    let sY: number = event.y;

    d3.select(this.parentNode).raise();

    event.on('drag', dragged).on('end', ended);

    function dragged(event) {
      callBack(selection, {
        x: sX - event.x,
        y: sY - event.y,
      });
      sX = event.x;
      sY = event.y;
    }

    function ended() {
      selection.classed('dragging', false);
    }
  };
};

export const generateDragCall = (
  callBack: Function
): DragBehavior<Element, unknown, unknown> => {
  return d3.drag().on('start', generateD3DragEvent(callBack));
};
