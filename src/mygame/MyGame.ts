
import Game from "../baseLibrary/Game.js"
import Rectangle from "../baseLibrary/Rectangle.js"
import GamepadTester from "../baseLibrary/GamepadTester.js"

export default class MyGame extends Game {
    constructor(canvas:HTMLCanvasElement) {
        super(canvas)

        //  add a test rectangle
        this.elements.push(new Rectangle(200, 400, 100, 40, "rgb(100,0,200)"))
        //  add a gamepad tester
        this.elements.push(new GamepadTester(0))
    }
}