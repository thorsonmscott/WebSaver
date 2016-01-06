import Vec2f from './vec2f'

const WIDTH_FACTOR = 0.1
const SPEED_FACTOR = 0.0025

export default class Slice {
  constructor(ctx) {
    this._ctx = ctx
    this._position = new Vec2f()
    this._motion = new Vec2f(this._ctx.canvas.width * SPEED_FACTOR, this._ctx.canvas.width * SPEED_FACTOR)
  }

  set position(position) {
    this._position = position
  }

  get position() {
    return this._position
  }

  setup() {
    return new Promise((resolve, reject) => {
      const image = document.createElement('img')
      image.onload = () => {
        this._image = image
        this._w = this._ctx.canvas.width * WIDTH_FACTOR
        this._h = (image.naturalHeight / image.naturalWidth) * this._w
        this._position.x = Math.random() * (this._ctx.canvas.width - this._w)
        this._position.y = Math.random() * (this._ctx.canvas.height - this._h)
        resolve()
      }
      image.onerror = function(e) {
        reject(e)
      }

      image.src = 'assets/slice.png'
    })
  }

  update() {
    this._position.add(this._motion)

    if (this._position.x < 0) {
      this._position.x = 0
      this._motion.x *= -1
    }
    if ((this._position.x + this._w) > this._ctx.canvas.width) {
      this._position.x -= 1
      this._motion.x *=-1
    }
    if (this._position.y < 0) {
      this._position.y = 0
      this._motion.y *= -1
    }
    if ((this._position.y + this._h) > this._ctx.canvas.height) {
      this._position.y -= 1
      this._motion.y *= -1
    }
  }

  draw(x, y, w, h) {
    this._ctx.drawImage(this._image, this._position.x, this._position.y, this._w, this._h)
  }
}
