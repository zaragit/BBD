import BBDBuilder from '../src/bbd';
import { BlockAttribute } from '../src/models/Block';
import testData from '../src/test.json';

/**
 * BBDBuilder 생성 테스트
 */
test('initialize BBD', () => {
  const builder: BBDBuilder = new BBDBuilder(
    'root',
    <BlockAttribute[]>testData
  );

  if (builder == null) throw 'bbd is null';
  if (builder.RootEl == null) throw 'RootEl is null';
  if (builder.SvgEl == null) throw 'SvgEl is null';
  if (builder.TextEl == null) throw 'TextEl is null';

  builder.renderBlock();
});
