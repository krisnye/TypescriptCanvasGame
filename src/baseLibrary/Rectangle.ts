import GameElement from "./GameElement.js"

// a simple example GameElement that only renders itself out as a filled rectangle.
export default class Rectangle extends GameElement {
    x: number
    y: number
    width: number
    height: number
    fillStyle: string
    constructor(x: number, y: number, width: number, height: number, fillStyle: string) {
        super()
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.fillStyle = fillStyle
    }

    render(c: CanvasRenderingContext2D) {
        c.fillStyle = this.fillStyle
        c.fillRect(this.x, this.y, this.width, this.height)
    }

}