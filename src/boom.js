

!function () {
    /** @type HTMLCanvasElement */
    const canvas = document.getElementById('boom-canvas')
    const ctx = canvas.getContext('2d')
    const width = canvas.width = 500
    const height = canvas.height = 700

    const canvasPosition = canvas.getBoundingClientRect()

    /** @type Boom[] */
    const booms = []

    class Boom {

        constructor(x, y) {

            this.spriteWidth = 200
            this.spriteHeight = 179
            this.width = this.spriteWidth / 2
            this.height = this.spriteHeight / 2
            this.x = x
            this.y = y
            this.image = new Image()
            this.image.src = '/assets/imgs/boom.png'
            this.audio = new Audio()
            this.audio.src = '/assets/sounds/boom.wav'
            this.frame = 0
            this.timer = 0
            this.angle = Math.random() * Math.PI * 2
        }

        update() {
            // this.frame = (++this.frame) % 5
            this.timer++
            if (this.timer % 10 === 0) {
                this.frame++
            }


        }

        draw() {
            ctx.save()
            ctx.translate(this.x, this.y)
            ctx.rotate(this.angle)
            // if(this.audio.played.length ===0){
            //     this.audio.play()
            // }
            ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, -this.width/2, -this.height/2, this.width, this.height)
            ctx.restore()
        }
    }

    canvas.addEventListener('click', e => {
        createAnimation(e)
    })

    function createAnimation(e) {

        const positionX = e.x 
        const positionY = e.y
        const boom = new Boom(positionX, positionY)
        booms.push(boom)
    }

    function animate() {
        ctx.clearRect(0, 0, width, height)
        for (let index = 0; index < booms.length; index++) {
            const boom = booms[index];
            boom.update()
            boom.draw()
            if(boom.frame > 5){
                booms.splice(index--,1)
            }
        }
        requestAnimationFrame(animate)
    }

    animate()
}()