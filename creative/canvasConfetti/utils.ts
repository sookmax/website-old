// this distance function is derived from y = e^x
//
// I wanted the distance function to have an upper horizontal asymtote (the destination)
// so that particles slow down significantly when they are close to the destination.
// this gives you a nice decaying effect.
//
// 1. y = e^x
// 2. y = -e^x (flip y-axis)
// 3. y = -e^(-x) (flip x-axis)
// at this point the function has its upper bound at y = 0
// we translate the function to have the upper bound of destination (Sd)
//
// 4. y = -e^(-x) + Sd
// we also want our distance to start at 0 when the time is 0
// currently y = 0 at x = -lnSd.
// so we translate the function about lnSd in x-axis (to the right)
//
// 5. y = -e^(-(x - lnSd)) + Sd
// If we take the derivative of (5) then we get the velocity function.
// v = -e^(-(x - lnSd)) * (-1)
// v(0) = -Sd * (-1) = Sd
// notice here (-1) comes from the coefficient of x in (5)
// meaning we can control the initial velocity with it. Let's name it Vfactor (velocity factor)
//
// 6. y = -e^(-(Vfactor * x - lnSd)) + Sd
// This is our final function.
export function getDistanceFunction(destination: number, vFactor: number = 1) {
  return (t: number) => {
    return -Math.exp(-(vFactor * t - Math.log(destination))) + destination;
  };
}

export function getGravityFunction(g: number, s0: number, v0: number) {
  return (t: number) => {
    return (g / 2) * t ** 2 + v0 * t + s0;
  };
}

export class Vector2 {
  public x;
  public y;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  public length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  public unit() {
    const length = this.length();
    this.x /= length;
    this.y /= length;
    return this;
  }

  public addVector(vector: Vector2) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  public subVector(vector: Vector2) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  public multiplyScalar(scalar: number) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  public addX(x: number) {
    this.x += x;
    return this;
  }

  public addY(y: number) {
    this.y += y;
    return this;
  }

  public clone() {
    return new Vector2(this.x, this.y);
  }
}
