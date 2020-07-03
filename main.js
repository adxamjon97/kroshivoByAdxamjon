// sichqonchani qimirlatgan paytda kanvas dan tashqariga kordinata 
// xusoblamaslik xatto qizil chiziqni pastinixam xusoblamaslik kerek

// qizil chiziqda to'xtasa sharcha to'xtashi kere
// to'xtagan kordinata elab qolinishi kere

// turburchechalarni qo'shish kere

// sharichani obyektga otkizish kere va ularni ko'p marta otlekon qilish kere
let body = document.body

let div = document.createElement("div")
let can = document.createElement("canvas")

body.appendChild(div).appendChild(can)

let ctx = can.getContext("2d")

let pong = new Audio()
pong.src = "ping-pong.mp3"

var ekran = {
    width:  document.documentElement.clientWidth/3,
    height: document.documentElement.clientHeight-4
}

can.width  = ekran.width
can.height = ekran.height

can.style.backgroundColor = '#bbb'
body.style.backgroundColor = "black"
div.style.textAlign = 'center'

var mouse = {
    x: ekran.width/2,
    y: ekran.height/2
}
// sharlarni ko'p qilib yaratish uchun
class sharik{
    constructor(x, y){ // yo'naltirilgan kordinatlari
        this.x = x 
        this.y = y
    }
}

var kord = {
    x1: 0, y1: 0,
    x2: 0, y2: 0
}
var bosildimi = false
can.addEventListener('mousedown', (e)=>{
    kord.x1 = ekran.width/2
    kord.y1 = tusiqcha
    bosildimi = true
    quyvarildimi = false
    path = { x: 0, y: 0 } 
})

can.addEventListener('mousemove', (e) => {
    mouse.x = e.offsetX
    mouse.y = e.offsetY
})

var quyvarildimi = false
can.addEventListener('mouseup',(e) => {
    kord.x2 = e.offsetX
    kord.y2 = e.offsetY
    bosildimi = false
    quyvarildimi = true
    if(kord.x1!==kord.x2 && kord.y1!==kord.y2) husob()
})
document.addEventListener('contextmenu',(e)=>{
    e.preventDefault()
})
// FIX: sayt zagruska bo'lmasdan grafik xajmi o'zgarishi kerek
window.addEventListener('resize', (event) => {
    clearTimeout(resizeTimeout)
    var resizeTimeout = setTimeout(() => {
        window.location.reload()
    }, 1500)
})
// sichqonchadan foydalanish uchun sensordan foydalanamiza
function onTouch(evt) {
    evt.preventDefault();
    if (evt.touches.length > 1 || (evt.type == "touchend" && evt.touches.length > 0))
      return;
  
    var newEvt = document.createEvent("MouseEvents");
    var type = null;
    var touch = null;
  
    switch (evt.type) {
      case "touchstart": 
        type = "mousedown";
        touch = evt.changedTouches[0];
        break;
      case "touchmove":
        type = "mousemove";
        touch = evt.changedTouches[0];
        break;
      case "touchend":        
        type = "mouseup";
        touch = evt.changedTouches[0];
        break;
    }
  
    newEvt.initMouseEvent(type, true, true, evt.originalTarget.ownerDocument.defaultView, 0,
      touch.screenX, touch.screenY, touch.clientX, touch.clientY,
      evt.ctrlKey, evt.altKey, evt.shiftKey, evt.metaKey, 0, null);
    evt.originalTarget.dispatchEvent(newEvt);
  }

var path = { x: 0, y: 0 }
const speed = 15   // tezlik
function husob(){ // harakatlanish kordinatasini husoblash
    let a = kord.x1-kord.x2
    let b = kord.y1-kord.y2
    let c = Math.sqrt(a**2 + b**2)
    path = { x: -a/c * speed, y: -b/c * speed }
}

function boshlandi(){

}

var harakat = { x: 0, y: 0 }
var devor = {
    x1: 0, y1: 0,
    x2: ekran.width, y2: ekran.height
}
var radius = 0.01*ekran.height*90/100
function ellips(x, y){
    ctx.fillStyle = "black" // qora ran jonga tegsa o'zgartiramiz tangini//"rgb(240,168,96)"
    ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.arc(x, y, radius, 0, Math.PI*2, true)
    ctx.closePath()
    ctx.fill()
}

function analiz(){
    ctx.font = "20px arial"
    
    let items = [
        `position mouse x: ${mouse.x} y: ${mouse.y}`,
        `begin x1: ${kord.x1} y1: ${kord.y1}`,
        `end    x2: ${kord.x2} y2: ${kord.y2}`,
        `oraliq va/yoki tezlik: ${oraliq}`,
        `yo'nalish pathX: ${path.x} pathY: ${path.y}`,
        `bosildimi: ${bosildimi}`,
        `qo'yvarildimi: ${quyvarildimi}`, 
        `harakat x: ${harakat.x} y: ${harakat.y}`,
    ]
    let iter = 100
    for(let i of items){
        ctx.fillText(i,  50, iter)
        iter += 20
    }
}
var tusiqcha = ekran.height*90/100
var tusiq = {
    x1: 0,           y1: ekran.height*90/100,
    x2: ekran.width, y2: ekran.height*90/100
}
function ren(){
    ctx.clearRect(0, 0, ekran.width, ekran.height);
    
    ctx.lineWidth = 0.005*tusiqcha
    ctx.setLineDash([10,0])
    ctx.strokeStyle = "red"
    ctx.beginPath()
        ctx.moveTo(tusiq.x1, tusiq.y1)
        ctx.lineTo(tusiq.x2, tusiq.y2)
    ctx.closePath();
    ctx.stroke()
    
    // asosiy chizma
    if(bosildimi){
        ellips(harakat.x, harakat.y)
        
        ctx.setLineDash([5,7]) // sichqonchanli bosib tortgana chiziqli ko'rsatgich
        ctx.lineWidth = 0.0008*tusiqcha
        ctx.strokeStyle = "black"
        ctx.beginPath()
            ctx.moveTo(kord.x1, kord.y1)
            ctx.lineTo(mouse.x, mouse.y)
        ctx.closePath()
        ctx.stroke()

        harakat = { x: kord.x1, y: kord.y1 }
    }

    if(quyvarildimi){
        // devorlarga urilganda yo'nalishni o'zgartiradi
        if(devor.x1 >= harakat.x-radius || devor.x2+devor.x1 <= harakat.x+radius){
            pong.load()
            path.x = -path.x
            pong.play()
        } else ellips(harakat.x, harakat.y)
        
        if(devor.y1 >= harakat.y-radius || devor.y2+devor.y1 <= harakat.y+radius){
            pong.load()
            path.y = -path.y
            pong.play()
        } else ellips(harakat.x, harakat.y)
        
        harakat.x += path.x
        harakat.y += path.y
    }
    ctx.fill()

    ctx.fillStyle = "black"
    
    //analiz()
    
    ctx.font = `bold ${0.04*tusiqcha}px arial`
    ctx.fillText("Kroshivo by Adxamjon",  0.01*tusiqcha, 0.05*tusiqcha)

    ctx.fill()
    requestAnimationFrame(ren)
}

ren()