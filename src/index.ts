import testData from './test.json';
import BBDBuilder from './bbd';
import { BlockProps } from './models';

/**
 * Library Sample Interface
 */
new BBDBuilder('root', <BlockProps[]>testData).renderBlock();
