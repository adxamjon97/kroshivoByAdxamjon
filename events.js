import Sharik from "/sharik.js"
import {ekran, device} from "/dom.js"

export var bosildimi = false
function down(){ bosildimi = true }

export var mouse = { x: 0, y: 0 }
function move(e){
    mouse.x = e.pageX
    mouse.y = e.pageY
}

export var lvl = 1,
    shariklar = [],
    tusiqcha  = ekran.height*90/100,
    tuxtadi   = ekran.width/2

var kord = {
    x1: ekran.width/2, y1: tusiqcha, //ekran.width/2
    x2: 0, y2: 0 
}

export var harakat = { x: kord.x1, y: kord.y1 }
            
const speed = 15   // tezlik
function up(e){
    bosildimi = false
    let a = tuxtadi  - e.pageX
    let b = tusiqcha - e.pageY
    let c = Math.sqrt(a**2 + b**2)
    shariklar.push(new Sharik(tuxtadi, tusiqcha, harakat.x, harakat.y, -a/c * speed, -b/c * speed))
    console.log(shariklar.length)
    eventClear()
}
function eventClear(){
    if(device == "mouse" || device == "all"){
        document.removeEventListener("mousedown", down)
        document.removeEventListener('mousemove', move)
        document.removeEventListener("mouseup",   up)
    }

    if(device == "touch" || device == "all"){
        document.removeEventListener('touchstart', down)
        document.removeEventListener('touchmove',  (e) => move(e.changedTouches[0]))
        document.removeEventListener('touchend',   (e) => up(e.changedTouches[0]))
    }    
}

export function eventStart(){
    if(device == "mouse" || device == "all"){
        document.addEventListener('mousedown', down)
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup',   up)
        document.addEventListener('contextmenu', (e) => { e.preventDefault() })
    }
    
    if(device == "touch" || device == "all"){
        document.addEventListener('touchstart', down)
        document.addEventListener('touchmove', (e) => move(e.changedTouches[0]))
        document.addEventListener('touchend',  (e) => up(e.changedTouches[0]))
    }
}


// FIX: sayt zagruska bo'lmasdan grafik xajmi o'zgarishi kerek
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout)
    var resizeTimeout = setTimeout(() => {
        window.location.reload()
    }, 1500)
})