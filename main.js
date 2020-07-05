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

let start = new Audio()
start.src = "start.mp3"
// start.play()
let ping = new Audio()
ping.src = "pong.mp3"
let pong = new Audio()
pong.src = "pong.mp3"


var ekran = {
    width:  document.documentElement.clientWidth<=560?document.documentElement.clientWidth:560,
    height: document.documentElement.clientHeight-4
}

can.width  = ekran.width
can.height = ekran.height

can.style.backgroundColor = '#bbb'
body.style.backgroundColor = "black"
// div.style.textAlign = 'center'

var mouse = { x: 0, y: 0 }
// sharlarni ko'p qilib yaratish uchun
class sharik{
    // fix construktor o'zgaruvchilarini obyekt ko'rinishida qabul qilish
    constructor(startX, startY, x, y,toX, toY){ // yo'naltirilgan kordinatlari
        this.startX = startX
        this.startY = startY  // boshlang'ich kordinatasi
        this.x = x //turgan kordinatasi
        this.y = y
        this.toX = toX // qo'shilib boruvchi kordinatasi
        this.toY = toY
    }
}

var kord = {
    x1: ekran.width/2, y1: 0,
    x2: 0, y2: 0
}
var bosildimi = false
function down(){
    // kord.x1 = ekran.width/2
    kord.y1 = tusiqcha
    bosildimi = true
    quyvarildimi = false
    path = { x: 0, y: 0 } 
}
document.addEventListener('touchstart', down)
can.addEventListener('mousedown', down)

function move(e){
    mouse.x = e.pageX
    mouse.y = e.pageY
}
document.addEventListener('touchmove', (e) => move(e.changedTouches[0]))
can.addEventListener('mousemove', move)

var quyvarildimi = false
function up(e){
    kord.x2 = e.pageX
    kord.y2 = e.pageY
    bosildimi = false
    quyvarildimi = true
    if(kord.x1!==kord.x2 && kord.y1!==kord.y2) husob()
    document.removeEventListener('touchstart', down)
    can.removeEventListener("mousedown", down)
    document.removeEventListener('touchend', (e) => up(e.changedTouches[0]))
    can.removeEventListener("mouseup", up)
    
}
document.addEventListener('touchend',(e) => up(e.changedTouches[0]))
can.addEventListener('mouseup', up)
document.addEventListener('contextmenu', (e) => { e.preventDefault() })

// FIX: sayt zagruska bo'lmasdan grafik xajmi o'zgarishi kerek
window.addEventListener('resize', (event) => {
    clearTimeout(resizeTimeout)
    var resizeTimeout = setTimeout(() => {
        window.location.reload()
    }, 1500)
})

var path = { x: 0, y: 0 }
const speed = 15   // tezlik
function husob(){ // harakatlanish kordinatasini husoblash
    let a = kord.x1-kord.x2
    let b = kord.y1-kord.y2
    let c = Math.sqrt(a**2 + b**2)
    path = { x: -a/c * speed, y: -b/c * speed }
}

// function boshlandi(){}

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

var lvl = 1
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
            ping.load()
            path.x = -path.x
            ping.play()
        } else ellips(harakat.x, harakat.y)
        
        if(devor.y1 >= harakat.y-radius || devor.y2+devor.y1 <= harakat.y+radius){
            pong.load()
            path.y = -path.y
            pong.play()
        } else ellips(harakat.x, harakat.y)
        
        if(harakat.y >= tusiq.y1 && path.y > 0){
            path = { x: 0, y: 0 }
            kord.x1 = harakat.x
            document.addEventListener('touchstart', down)
            can.addEventListener('mousedown', down)
            document.addEventListener('touchend',(e) => up(e.changedTouches[0]))
            can.addEventListener('mouseup', up)
            lvl++
        }

        harakat.x += path.x
        harakat.y += path.y
    }
    ctx.fill()

    ctx.fillStyle = "black"
    
    //analiz()
    
    ctx.font = `bold ${0.04*tusiqcha}px arial`
    ctx.fillText("Kroshivo by Adxamjon",  0.01*tusiqcha, 0.05*tusiqcha)
    ctx.fillText(`lvl: ${lvl}`,  0.01*tusiqcha, 0.09*tusiqcha)

    ctx.fill()
    requestAnimationFrame(ren)
}

ren()