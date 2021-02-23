import BBD from '../src/bbd';
import testData from '../src/test.json';

/**
 * BBD 생성 테스트
 */
test('initialize BBD', () => {
  var bbd: BBD = new BBD('root');

  if (bbd == null) throw 'bbd is null';
  if (bbd.RootEl == null) throw 'RootEl is null';
  if (bbd.SvgEl == null) throw 'SvgEl is null';
  if (bbd.TextEl == null) throw 'TextEl is null';

  bbd.renderBlock(testData);
});
