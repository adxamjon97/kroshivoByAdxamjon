// turburchechalarni qo'shish kere

// sichqonchani bosganda nuqtali chiziq devorgacha bo'lishi kere

// sharichani obyektga otkizish kere va ularni ko'p marta otlekon qilish kere

// blocklarni yaratish kere
import {ctx, ekran} from "/dom.js"
import {
    bosildimi, 
    mouse, 
    lvl, 
    tusiqcha, 
    harakat,
    tuxtadi,
    shariklar,
    eventStart
} from "/events.js"
import ellips, {radius} from "/ellipse.js"
eventStart()
let start = new Audio()
start.src = "start.mp3"
// start.play()  // o'yin boshlangan payti chonlinishi uchun

var devor   = {
    x1: 0, y1: 0,
    x2: ekran.width, y2: ekran.height
}

var tusiq = {
    x1: 0,           y1: ekran.height*90/100,
    x2: ekran.width, y2: ekran.height*90/100
}
var sharlarQaytdi = 0
function ren(){
    ctx.clearRect(0, 0, ekran.width, ekran.height)
    
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
            ctx.moveTo(tuxtadi, tusiqcha)
            ctx.lineTo(mouse.x, mouse.y)
        ctx.closePath()
        ctx.stroke()

        // alert(tuxtadi+ ' ' + tusiqcha)
        // harakat = { x: tuxtadi, y: tusiqcha }
    }else{
        for(let shar of shariklar){
            if(devor.x1 >= shar.x-radius && shar.toX < 0 
                || devor.x2+devor.x1 <= shar.x+radius && shar.toX > 0){
                shar.toX = -shar.toX
            }else if(devor.y1 >= shar.y-radius && shar.toY < 0){
                shar.toY = -shar.toY
            }else ellips(shar.x, shar.y)
            
            if(shar.y >= tusiq.y1 && shar.toY > 0){
                shar.toX = 0
                shar.toY = 0
                
                if(sharlarQaytdi>=shariklar.length-1){
                    eventStart()
                    // alert(tuxtadi+ ' ' + parseInt(shar.x))
                    // tuxtadi = parseInt(shar.x) 
                    // lvl++
                    sharlarQaytdi = 0
                }else{
                    sharlarQaytdi++
                }
            }
            shar.x += shar.toX
            shar.y += shar.toY
        }
    }
    ctx.fill()

    ctx.fillStyle = "black"
    
    ctx.font = `bold ${0.04*tusiqcha}px arial`
    ctx.fillText("Kroshivo by Adxamjon",  0.01*tusiqcha, 0.05*tusiqcha)
    ctx.fillText(`lvl: ${lvl}`,  0.01*tusiqcha, 0.09*tusiqcha)

    ctx.fill()
    requestAnimationFrame(ren)
}

ren()