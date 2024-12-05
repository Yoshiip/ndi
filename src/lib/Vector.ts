export default class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Vector): Vector {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  subtract(other: Vector): Vector {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  multiply(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  divide(scalar: number): Vector {
    if (scalar === 0) {
      throw new Error("Division by zero is not allowed.");
    }
    return new Vector(this.x / scalar, this.y / scalar);
  }

  length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize(): Vector {
    const len = this.length();
    if (len === 0) {
      throw new Error("Cannot normalize a zero-length vector.");
    }
    return this.divide(len);
  }

  toString(): string {
    return `Vector(${this.x}, ${this.y})`;
  }

  distanceTo(other: Vector): number {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  intersects(size: Vector, pos: Vector): boolean {
    return (
      pos.x >= this.x &&
      pos.x <= this.x + size.x &&
      pos.y >= this.y &&
      pos.y <= this.y + size.y
    );
  }
}
