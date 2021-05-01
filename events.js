var bosildimi = false

function down(){ bosildimi = true }

var mouse = { x: 0, y: 0 }

function move(e){
    mouse.x = e.pageX
    mouse.y = e.pageY
}

var lvl = 1,
    shariklar = [],
    tusiqcha  = ekran.height*90/100,
    tuxtadi   = ekran.width/2

var kord = {
    x1: ekran.width/2, y1: tusiqcha, //ekran.width/2
    x2: 0, y2: 0 
}

var harakat = { x: kord.x1, y: kord.y1 }
            
const speed = 15   // tezlik

function up(e){
    bosildimi = false
    
    let a = tuxtadi  - e.pageX
    let b = tusiqcha - e.pageY
    let c = Math.sqrt(a**2 + b**2)
    
    shariklar.push(
    	new Sharik(tuxtadi, tusiqcha, 
    		harakat.x, harakat.y, 
    		-a/c * speed, -b/c * speed
    	))
    
    console.log(shariklar.length)
    
    eventClear()
}



function eventClear(){
	let drel = (t,e) => document.removeEventListener(t,e)
	
	let devall = device == "all"
	
    if(device == "mouse" || devall){
        drel("mousedown", down)
        drel('mousemove', move)
        drel("mouseup",   up)
    }

    if(device == "touch" || devall){
        drel('touchstart', down)
        drel('touchmove',  (e) => move(e.changedTouches[0]))
        drel('touchend',   (e) =>   up(e.changedTouches[0]))
    }    
}

let eventStart = () => {
	let dael = (t,e) => document.addEventListener(t,e)
	
	let devall = device == "all"
	
    if(device == "mouse" || devall){
        dael('mousedown', down)
        dael('mousemove', move)
        dael('mouseup',   up)
        dael('contextmenu', (e) => { e.preventDefault() })
    }
    
    if(device == "touch" || devall){
        dael('touchstart', down)
        dael('touchmove', (e) => move(e.changedTouches[0]))
        dael('touchend',  (e) =>   up(e.changedTouches[0]))
    }
}


// FIX: sayt zagruska bo'lmasdan grafik xajmi o'zgarishi kerek
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout)
    
    var resizeTimeout = setTimeout(() => {
        window.location.reload()
    }, 1500)
})