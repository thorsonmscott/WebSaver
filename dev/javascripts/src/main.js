import BaseLoop from './modules/base-loop'
import Slice from './modules/slice'

const W = document.getElementById('application').offsetWidth
const H = document.getElementById('application').offsetHeight

const canvas = document.getElementById('canvas')
canvas.width = W
canvas.height = H
const ctx = canvas.getContext('2d')

const App = new BaseLoop()
const slice = new Slice(ctx)


App.setup = () => {

}

App.update = () => {
  slice.update()

}

App.draw = () => {
  slice.draw(0, 0)
}

slice.setup()
  .then(() => {
    App.start()
  })
