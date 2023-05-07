import Tree from './tree';
import View from './view';
document.addEventListener('DOMContentLoaded', () => {
  new ElasticTree();
});

class ElasticTree {
  view: View;
  tree: Tree;
  prevTime: number | null = null;
  constructor() {
    this.tree = new Tree();
    this.view = new View(this.tree);
    this.startCapture();
  }

  startCapture() {
    window.requestAnimationFrame(this.captureFrame);
  }

  captureFrame = (t: number) => {
    if (this.prevTime === null) {
      this.prevTime = t;
      window.requestAnimationFrame(this.captureFrame);
      return;
    }
    const gap = t - this.prevTime;
    this.prevTime = t;
    const windSpeed = 0 + Math.cos(0.002 * t) * 10;
    const slider = document.querySelector('#speed') as HTMLInputElement;
    if (!slider) {
      return;
    }
    this.tree.move(gap, parseInt(slider.value) + Math.cos(0.002 * t) * 2);
    this.view.draw();
    window.requestAnimationFrame(this.captureFrame);
  };
}
