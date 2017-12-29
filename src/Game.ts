
import GameElement from "./GameElement"

export default class Game {
    static current: Game
    canvas: HTMLCanvasElement
    lastUpdateTime: number | null
    elements: GameElement[] = []
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        Game.current = this
    }

    main() {
        //  get context
        let c = this.canvas.getContext("2d")
        if (c == null) {
            console.log("No context, couldn't render")
            return
        }
        //  get last update time
        let currentTime = performance.now()
        let lastUpdateTime = this.lastUpdateTime || currentTime
        let timeChange = currentTime - lastUpdateTime
        //  store new update time
        this.lastUpdateTime = currentTime

        this.update(timeChange)
        this.render(c)
        this.requestNextFrame()
    }

    update(timeChange: number) {
        // update elements in reverse, if they are removed, remove them.
        for (let i = this.elements.length - 1; i >= 0; i--) {
            let element = this.elements[i]
            element.update(timeChange)
            if (element.removed) {
                this.elements.splice(i, 1)
            }
        }
    }

    render(context: CanvasRenderingContext2D) {
        //  make sure canvas size matches window size
        this.canvas.width = document.body.clientWidth
        this.canvas.height = document.body.clientHeight
        //  clear
        context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (const element of this.elements) {
            element.render(context)
        }
    }

    requestNextFrame() {
        requestAnimationFrame(() => this.main())
    }

}