interface BlockAttribute {
    x: number;
    y: number;
    text: null | undefined | string;
    r?: number;
    width?: number;
    height?: number;
  }
  
  class Block implements BlockAttribute {
    x: number;
    y: number;
    text: string;
    r?: number;
    width?: number;
    height?: number;
  
    constructor(attribute: BlockAttribute) {
      this.x = attribute.x;
      this.y = attribute.y;
      this.text = attribute.text;
  
      if (attribute.r) {
        this.r = attribute.r;
      }
  
      if (attribute.width) {
        this.width = attribute.width;
      }
  
      if (attribute.height) {
        this.height = attribute.height;
      }
    }
  }
  