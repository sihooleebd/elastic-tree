import Co from './constant';
import Tree from './tree';

class View {
  tree: Tree;
  canvas: HTMLCanvasElement;
  constructor(tree: Tree) {
    this.tree = tree;
    const view = document.querySelector('#view');
    const canvas = document.querySelector('#view-canvas');
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('invalid canvas');
    }
    if (!view || !(view instanceof HTMLDivElement)) {
      throw new Error('invalid canvas');
    }
    this.canvas = canvas;
    view.style.width = `${Co.VIEW_WIDTH}px`;
    view.style.height = `${Co.VIEW_HEIGHT}px`;
    this.canvas.width = Co.VIEW_WIDTH * 2;
    this.canvas.height = Co.VIEW_HEIGHT * 2;
    this.canvas.style.width = `${Co.VIEW_WIDTH}px`;
    this.canvas.style.height = `${Co.VIEW_HEIGHT}px`;
  }
  draw() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.tree.draw(ctx);
  }
}

export default View;
