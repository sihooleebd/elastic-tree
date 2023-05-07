import Branch from './branch';
import Co from './constant';

class Tree {
  rootBranch: Branch;
  constructor() {
    this.rootBranch = new Branch(1, Co.VIEW_HEIGHT / 2, Co.VIEW_WIDTH / 50, 0);
  }
  move(gap: number, windSpeed: number) {
    this.rootBranch.move(windSpeed, 0);
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.rootBranch.draw(ctx, Co.VIEW_WIDTH, Co.VIEW_HEIGHT * 2);
  }
}
export default Tree;
