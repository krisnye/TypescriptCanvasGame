
import Game from "./Game.js"

export default class GameElement {

    removed: boolean = false

    update(timeChange: number) {
    }

    render(context: CanvasRenderingContext2D) {
    }

    //  removes this element from the Game
    remove() {
        // flags it for removal after the Game's next update
        this.removed = true
    }

}