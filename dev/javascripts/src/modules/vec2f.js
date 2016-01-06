export default class Vec2f {
  constructor(x = 0, y = 0) {
    this._x = x
    this._y = y
  }

  set x(x) {
    this._x = x
  }

  set y(y) {
    this._y = y
  }

  get x() {
    return this._x
  }

  get y() {
    return this._y
  }

  add(vec2f) {
    this._x += vec2f.x
    this._y += vec2f.y
  }
}
