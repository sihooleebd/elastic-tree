import { isPrivateIdentifier } from 'typescript';
import Co from './constant';

class Branch {
  children: Branch[] = [];
  length: number;
  thickness: number;
  angleToParent: number;
  displacementInDegree = 0;
  currentAngle = 0;
  constructor(
    depth: number,
    length: number,
    thickness: number,
    angleToParent: number,
  ) {
    this.length = length;
    this.thickness = thickness;
    this.angleToParent = angleToParent;
    const numberOfChildren = depth < 4 ? depth * 7 : 0;
    for (let i = 0; i < numberOfChildren; ++i) {
      const branch = new Branch(
        depth + 1,
        length / 1.2,
        thickness / 3,
        (Math.random() - 0.5) * Co.CHILD_BRANCH_ANGLE_RANGE * 2,
      );
      this.children.push(branch);
    }
    //
  }
  move(windSpeed: number, currentParentAngle: number) {
    this.currentAngle =
      currentParentAngle + this.angleToParent + this.displacementInDegree;
    const wCoefficient = 1;
    const windForce =
      wCoefficient *
      windSpeed *
      this.length *
      this.thickness *
      Math.cos(this.deg2rad(this.currentAngle));
    const windTorque =
      (windForce * Math.cos(this.deg2rad(this.currentAngle)) * this.length) / 2;
    const bCoefficient = 100;
    const branchTorque =
      bCoefficient *
      this.displacementInDegree *
      this.thickness *
      this.thickness *
      this.thickness;
    // console.log('wtorque=', windTorque, 'btorque=', branchTorque);
    // console.log(
    //   '---------------------------------------------------------------',
    // );
    if (this.thickness != Co.VIEW_WIDTH / 50) {
      this.displacementInDegree +=
        (windTorque - branchTorque) / 1000000 / this.thickness;
    }

    this.currentAngle =
      currentParentAngle + this.angleToParent + this.displacementInDegree;
    if (this.currentAngle > 90) {
      this.currentAngle = 90;
    }
    if (this.currentAngle < -90) {
      this.currentAngle = -90;
    }
    this.children.forEach((branch) => {
      branch.move(windSpeed, this.currentAngle);
    });
  }
  private deg2rad = (degree: number) => (Math.PI / 180) * degree;
  private rad2deg = (radian: number) => (radian * 180) / Math.PI;
  draw(ctx: CanvasRenderingContext2D, parentEndX: number, parentEndY: number) {
    const nx =
      parentEndX + this.length * Math.sin(this.deg2rad(this.currentAngle));
    const ny =
      parentEndY - this.length * Math.cos(this.deg2rad(this.currentAngle));

    // ctx.beginPath();
    // ctx.fillStyle = '#F00';
    // ctx.arc(100, 100, 50, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.closePath();
    ctx.beginPath();
    ctx.lineWidth = this.thickness;
    ctx.strokeStyle = '#777';
    ctx.lineCap = 'round';
    ctx.moveTo(parentEndX, parentEndY);
    ctx.lineTo(nx, ny);
    ctx.stroke();
    ctx.closePath();
    // console.log(
    //   'COORS (in px py nx ny order) : ',
    //   parentEndX,
    //   parentEndY,
    //   nx,
    //   ny,
    // );
    this.children.forEach((branch) => {
      branch.draw(ctx, nx, ny);
    });
  }
}
export default Branch;
