import testData from './test.json';
import BBDBuilder from './bbd';
import { BlockAttribute } from './models/Block';

/**
 * Library Sample Interface
 */
new BBDBuilder('root', <BlockAttribute[]>testData).renderBlock();
