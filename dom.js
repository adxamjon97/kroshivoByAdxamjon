export let device
if(/Windows/i.test(navigator.userAgent)){
    device = 'mouse'
}else if(/Android/i.test(navigator.userAgent)){
    device = 'touch'
}else{
    device = 'all'
}

let body = document.body

let div = document.createElement("div")
let can = document.createElement("canvas")

body.appendChild(div).appendChild(can)

export let ctx = can.getContext("2d")

export var ekran = {
    width:  document.documentElement.clientWidth<=560?document.documentElement.clientWidth:560,
    height: document.documentElement.clientHeight-4
}

can.width  = ekran.width
can.height = ekran.height

can.style.backgroundColor  = '#ccc'
body.style.backgroundColor = "black"