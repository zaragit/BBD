/**
 * 원형
 */
canvas
  .selectAll()
  .data(testData)
  .enter()
  .append('g')
  .append('circle')
  .attr('cx', (d) => d.x)
  .attr('cy', (d) => d.y)
  .attr('r', (d) => d.r)
  .attr('fill', 'white')
  .attr('stroke', 'gray')
  .call(d3.drag().on('start', started))
  .on('click', (e, d) => {
    console.log(d);
    console.log(e);
  })
  .append('text')
  .text((d) => d.text);

/**
 * 사각형
 */
canvas.append('rect').attr('x', 110).attr('width', 100).attr('height', 100);

/**
 * 선
 */
canvas
  .append('line')
  .attr('y1', 110)
  .attr('x2', 210)
  .attr('y2', 110)
  .attr('stroke', 'green')
  .attr('stroke-width', 10);

/**
 * 육각형
 */
var _s32 = Math.sqrt(3) / 2;
var A = 50;
var xDiff = 220 + A;
var yDiff = 0 + A;
var pointData = [
  [A + xDiff, 0 + yDiff],
  [A / 2 + xDiff, A * _s32 + yDiff],
  [-A / 2 + xDiff, A * _s32 + yDiff],
  [-A + xDiff, 0 + yDiff],
  [-A / 2 + xDiff, -A * _s32 + yDiff],
  [A / 2 + xDiff, -A * _s32 + yDiff],
];
canvas
  .selectAll('path.area')
  .data([pointData])
  .enter()
  .append('path')
  .style('fill', '#ff0000')
  .attr('d', d3.line());
