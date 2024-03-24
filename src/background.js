

!function () {
    //获取canvas
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    // canvas.style.background = '#000'
    document.body.append(canvas)

    //设置图像

    const CANVAS_WIDTH = canvas.width = 800
    const CANVAS_HEIGHT = canvas.height = 700

    let gameSpeed = 5

    const bgLayer1 = new Image()
    bgLayer1.src = '/assets/imgs/layer-1.png'
    const bgLayer2 = new Image()
    bgLayer2.src = '/assets/imgs/layer-2.png'
    const bgLayer3 = new Image()
    bgLayer3.src = '/assets/imgs/layer-3.png'
    const bgLayer4 = new Image()
    bgLayer4.src = '/assets/imgs/layer-4.png'
    const bgLayer5 = new Image()
    bgLayer5.src = '/assets/imgs/layer-5.png'

    let gameFrame = 0

    const audio = new Audio()
    audio.src = '/assets/sounds/bg-main.wav'
    audio.loop = true
    class Layer {
        constructor(image, speedModifier) {
            this.x = 0
            this.y = 0
            this.width = 2400
            this.height = 700
            this.image = image
            this.speedModifier = speedModifier
            this.speed = gameSpeed * this.speedModifier
        }
        update() {
            this.speed = gameSpeed * this.speedModifier
            // if (this.x <= -this.width) {
            //     this.x = 0
            // }
            // this.x = Math.floor(this.x - this.speed)
            this.x = this.speed * gameFrame % this.width
        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
        }
    }

    const layer1 = new Layer(bgLayer1, 0.2)
    const layer2 = new Layer(bgLayer2, 0.4)
    const layer3 = new Layer(bgLayer3, 0.6)
    const layer4 = new Layer(bgLayer4, 0.8)
    const layer5 = new Layer(bgLayer5, 1)

    const layerArray = [layer1, layer2, layer3, layer4, layer5]

    function animate() {
        audio.play()
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        // ctx.drawImage(bgLayer4, x, 0)
        // x = x < -1000 ? 0 : (x-gameSpeed)
        layerArray.forEach(layer => {
            layer.update()
            layer.draw()
        })
        gameFrame--
        requestAnimationFrame(animate)
    }
 
    animate()

}()