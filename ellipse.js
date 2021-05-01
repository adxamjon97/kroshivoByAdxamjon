let radius = 0.01*ekran.height*90/100

let ellips = (x, y) => {
    ctx.fillStyle = "black" // qora ran jonga tegsa o'zgartiramiz tangini//"rgb(240,168,96)"
    
    ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.arc(x, y, radius, 0, Math.PI*2, true)
    ctx.closePath()
    
    ctx.fill()
}