import * as d3 from 'd3';
import testData from './test.json';
import bbd from './bbd';
import { generateD3DragEvent } from './lib/utils';

const canvas = bbd.loadCanvas({
  rootEl: '#root',
  width: '100%',
  height: '100%',
});

bbd.renderBlock(testData);

const circle = canvas.selectAll().data(testData).enter().append('g');

circle
  .append('circle')
  .attr('cx', (d: any) => d.x)
  .attr('cy', (d: any) => d.y)
  .attr('r', (d: any) => d.r)
  .attr('fill', 'white')
  .attr('stroke', 'gray')
  .call(
    d3.drag().on(
      'start',
      generateD3DragEvent((selection, event, d) => {
        selection
          .raise()
          .attr('cx', (d.x = event.x))
          .attr('cy', (d.y = event.y));

        d3.select(selection._groups[0][0].parentNode.firstElementChild)
          .raise()
          .attr('x', d.x)
          .attr('y', d.y);
      })
    )
  )
  .on('click', (e, d) => {
    console.log(d);
    console.log(e);
  });

circle
  .append('text')
  .attr('x', (d: any) => d.x)
  .attr('y', (d: any) => d.y)
  .attr('text-anchor', 'middle')
  .attr('stroke', '#51c5cf')
  .attr('stroke-width', '2px')
  .attr('dy', '.3em')
  .text((d: any) => d.text)
  .on('dblclick', function (e) {
    console.log(this);
  });

function started(event) {
  var circle = d3.select(this).classed('dragging', true);
  var text = d3.select(this.parentNode.lastChild);

  event.on('drag', dragged).on('end', ended);

  function dragged(event, d) {
    circle
      .raise()
      .attr('cx', (d.x = event.x))
      .attr('cy', (d.y = event.y));

    text.raise().attr('x', d.x).attr('y', d.y);
  }

  function ended() {
    circle.classed('dragging', false);
  }
}
