export interface BlockData {
  x: number;
  y: number;
  width?: number;
  height?: number;
  r?: number;
  text?: string;
}

interface Block {
  data: BlockData;
  getX: Function;
  getY: Function;
  print: Function;
}

class Circle implements Block {
  data: BlockData;

  constructor(data: BlockData) {
    this.data = data;
  }

  print() {}
  getX() {}
  getY() {}
}

/**
 * 도형 별로 그리는 로직 처리에 빌더 패턴 사용 필요
 * 모델 구조 설계 중
 */
class BlockBuilder {
  private block: Block;
  private blockData: BlockData;

  constructor(block: Block) {
    this.block = block;
  }

  set data(blockData: BlockData) {
    this.blockData = blockData;
  }
}
