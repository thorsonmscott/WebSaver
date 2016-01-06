export default class BaseLoop {
  constructor() {
    this._setup = null
    this._update = null
    this._draw = null

    this._isRunning = false
    this._isSetup = false

    this._frameCount = 0

    this._boundFrame = this._frame.bind(this)
  }

  start() {
    if (!this._isSetup && this._setup) {
      this._setup()
      this._isSetup = true
    }
    this._isRunning = true
    window.requestAnimationFrame(this._boundFrame)
  }

  stop() {
    this._isRunning = false
  }

  set setup(func) {
    if (typeof func !== 'function') {
      throw new Error('setup property must be of type function')
    } else {
      this._setup = func
    }
  }

  set update(func) {
    if (typeof func !== 'function') {
      throw new Error('update property must be of type function')
    } else {
      this._update = func
    }
  }

  set draw(func) {
    if (typeof func !== 'function') {
      throw new Error('draw property must be of type function')
    } else {
      this._draw = func
    }
  }

  _frame() {
    if (this._update) {
      this._update()
    }

    if (this._draw) {
      this._draw()
    }

    this._frameCount++
    if (this._isRunning) {
      window.requestAnimationFrame(this._boundFrame)
    }
  }

}
