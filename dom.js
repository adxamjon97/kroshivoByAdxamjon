let dce = e => document.createElement(e)
let dde = document.documentElement
let nua = navigator.userAgent

let device

if(     /Windows/i.test(nua)) device = 'mouse'
else if(/Android/i.test(nua)) device = 'touch'
else device = 'all'

let body = document.body

let div = dce("div")
let can = dce("canvas")

body.appendChild(div).appendChild(can)

let ctx = can.getContext("2d")

var ekran = {
    width:  dde.clientWidth<=560 ? dde.clientWidth : 560,
    height: dde.clientHeight-4
}

can.width  = ekran.width
can.height = ekran.height

can.style.backgroundColor  = '#ccc'
body.style.backgroundColor = "black"