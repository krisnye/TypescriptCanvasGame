import GameElement from "./GameElement.js"
import Game from "./Game.js"

class TestBullet extends GameElement {
    x: number
    y: number
    dx: number
    dy: number
    text: string
    constructor(x: number, y: number, dx: number, dy: number, text: string) {
        super()
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.text = text
    }
    update(timeChange: number) {
        let game = Game.current
        // move self
        this.x += this.dx * timeChange
        this.y += this.dy * timeChange
        //  maybe remove self
        if (this.x < 0 || this.y < 0 || this.x > game.canvas.width || this.y > game.canvas.height)
            this.remove()
    }
    render(c: CanvasRenderingContext2D) {
        let radius = 20
        c.fillStyle = "rgb(232, 227, 220)"
        c.beginPath()
        c.arc(this.x, this.y, radius, 0, Math.PI * 2)
        c.fill()
        c.fillStyle = "rgb(0,0,0)"
        c.fillText(this.text, this.x - 5, this.y + 5)
    }
}

// a simple example GameElement that only renders itself out as a filled rectangle.
export default class GamepadTester extends GameElement {
    number: number = 0
    previousButtons: number[]
    buttons: number[]
    axes: number[]
    constructor(number: number) {
        super()
        this.number = number
    }

    update(timeChange: number) {
        this.previousButtons = this.buttons
        let gamepad = navigator.getGamepads()[this.number]
        if (gamepad == null) {
            this.buttons = []
            this.axes = []
        } else {
            this.buttons = gamepad.buttons.map(button => button.value)
            this.axes = gamepad.axes
        }
    }

    fireBullet(x: number, y: number, dx: number, dy: number, text: string) {
        let speed = 100 // in pixels per second
        Game.current.elements.push(new TestBullet(x, y, dx * speed, dy * speed, text))
    }

    render(c: CanvasRenderingContext2D) {
        let fontSize = 20
        c.font = `${fontSize}px Arial`
        //  draw a circle for each axis
        for (let i = 0; i < this.axes.length; i += 2) {
            let x = this.axes[i]
            let y = this.axes[i + 1]
            let radius = 100
            let originX = 200 + radius + (radius + 20) * i
            let originY = 250
            c.fillStyle = "rgb(237, 204, 161)"
            c.beginPath()
            c.arc(originX, originY, radius, 0, Math.PI * 2)
            c.fill()
            // draw relative direction.
            c.fillStyle = "rgb(183, 155, 119)"
            c.beginPath()
            let stickX = originX + x * radius
            let stickY = originY + y * radius
            c.arc(stickX, stickY, radius / 4, 0, Math.PI * 2)
            c.fill()
            // in general, you shouldn't do update logic like firing bullets from within rendering... but I will here because I'm lazy
            // maybe fire a bullet for each button
            if (Math.sqrt(x * x + y * y) >= 0.2) {
                //  this makes sure we only fire if the analog is pushed farther than 0.2 in some direction
                for (let i = 0; i < this.buttons.length; i++) {
                    if (this.buttons[i] == 1 && this.previousButtons[i] < 1) {
                        this.fireBullet(stickX, stickY, x, y, i.toString())
                    }
                }
            }
        }
        // draw button states
        c.fillStyle = "rgb(0,0,0)"
        c.fillText(`Controller Number ${this.number}`, 20, 20)
        for (let i = 0; i < this.buttons.length; i++) {
            c.fillText(`Button ${i} = ${this.buttons[i]}`, 20, 20 + (i + 1) * (fontSize + 4))
        }
        //  draw axis states
        for (let i = 0; i < this.axes.length; i++) {
            c.fillText(`Axis ${i} = ${this.axes[i].toFixed(4)}`, 160, 20 + (i + 1) * (fontSize + 4))
        }
    }

}