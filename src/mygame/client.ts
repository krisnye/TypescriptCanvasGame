
// <script src="/index.js" > </script>
//     < canvas id = 'mainCanvas' style = "border: solid 1px gray; width: 100%; height:100%" >
//         </canvas>
//         < script src = "" < script type = "module" >
//     import MyGame from "./lib/MyGame.js"
// const game = window.game = new MyGame(mainCanvas)
// game.main()
//     < /script>

import MyGame from "./MyGame"

//  remove the loading from the body by removing all children
while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild)
}

//  create a new canvas
let canvas = document.createElement("canvas")
//  set it's style
canvas.setAttribute("style", "border: solid 1px gray; width: 100%; height: 100%")
//  add it to the body
document.body.appendChild(canvas)

//  create the game object
const game = new MyGame(canvas)
//  also store on the window so we can interact with it in the console by typing "game"
;(window as any).game = game
//  start the games main loop
game.main()