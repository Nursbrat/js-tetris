import Controller from "./src/controller"
import Game from "./src/game"
import View from "./src/view"


const GRID_ROWS =20
const GRID_COLUMNS =10 
 
const element = document.getElementById('root')

const game=new Game(GRID_ROWS,GRID_COLUMNS)


const view=View({
    element,
    width: 480,
    height: 640,
    rows: GRID_ROWS,
    columns: GRID_COLUMNS
})

const  controller=new Controller(game,view)