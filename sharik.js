class Sharik { // sharni tuzatish kere
    /**
     * @param {boshlang'ich kordinatasi x} startX 
     * @param {boshlang'ich kordinatasi y} startY 
     * @param {turgan kordinatasi x} x 
     * @param {turgan kordinatasi y} y 
     * @param {keyingi kordinataga qatam x} toX 
     * @param {keyingi kordinataga qatam y} toY 
     */
    constructor(startX, startY, x, y, toX, toY){ // yo'naltirilgan kordinatlari
        this.startX = startX
        this.startY = startY  // boshlang'ich kordinatasi
        this.x = x //turgan kordinatasi
        this.y = y
        this.toX = toX // qo'shilib boruvchi kordinatasi
        this.toY = toY
        // this.ping = new Audio() // FIX: tovush faqatgina block ga urunganda eshitilsin
        // this.ping.src = "pong.mp3" 
    }
}