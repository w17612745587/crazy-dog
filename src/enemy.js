// !function () {
//     /**@type HTMLCanvasElement */
//     const canvas = document.getElementById('enemy-canvas')
//     const ctx = canvas.getContext('2d')
//     canvas.width = 500
//     canvas.height = 800

//     class Game {
//         constructor(ctx, width, height) {
//             /**@type Enemy[] */
//             this.enemies = []
//             this.ctx = ctx
//             this.width = width
//             this.height = height
//             this.enemyInterval = 100
//             this.enemyTimer = 0
//             this.enemyTypes = ['worm', 'ghost', 'spider']
//         }

//         #addNewEnemy() {
//             const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)]
//             if (randomEnemy === 'worm') this.enemies.push(new Worm(this))
//             else if (randomEnemy === 'ghost') this.enemies.push(new Ghost(this))
//             else if (randomEnemy === 'spider') this.enemies.push(new Spider(this))
//             this.enemies.sort((a, b) => a.y - b.y)
//         }

//         update(deltaTime) {
//             this.enemies = this.enemies.filter(item => !item.markedForDeletion)
//             if (this.enemyTimer > this.enemyInterval) {
//                 this.#addNewEnemy()
//                 this.enemyTimer = 0
//             } else {
//                 this.enemyTimer += deltaTime
//             }
//             this.enemies.forEach(item => item.update(deltaTime))
//         }

//         draw() {
//             this.enemies.forEach(item => item.draw())
//         }
//     }

//     class Enemy {
//         constructor(game) {
//             /**@type Game */
//             this.game = game
//             this.width = 100
//             this.height = 100
//             this.x = this.game.width
//             this.y = Math.random() * this.game.height - this.height
//             this.markedForDeletion = false
//             this.frameX = 0
//             this.maxFrame= 5
//             this.frameInterval = 100
//             this.frameTimer = 0
//         }

//         update(deltaTime) {
//             this.x -= this.vx * deltaTime
//             if (this.x <= -this.width) {
//                 this.markedForDeletion = true
//             }

//             if(this.frameTimer > this.frameInterval){
//                 if(this.frameX < this.maxFrame){
//                     this.frameX ++
//                 }else{
//                     this.frameX = 0
//                 }
//                 this.frameTimer = 0
//             }else{
//                 this.frameTimer += deltaTime
//             }
//         }

//         draw() {
//             // console.log('draw', this.x, this.y, this.width, this.height)
//             // this.game.ctx.fillRect(this.x, this.y, this.width, this.height)

//             this.game.ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
//         }
//     }

//     class Worm extends Enemy {
//         constructor(game) {
//             /**@type Game */
//             super(game)
//             this.spriteWidth = 229
//             this.spriteHeight = 171
//             this.width = this.spriteWidth / 2
//             this.height = this.spriteHeight / 2
//             this.x = this.game.width
//             // this.y = Math.random() * (this.game.height - this.height)
//             this.y = (this.game.height - this.height)
//             this.image = worm
//             this.vx = Math.random() * 0.1 + 0.1

//         }
//     }

//     class Ghost extends Enemy {
//         constructor(game) {
//             super(game)
//             this.spriteWidth = 261
//             this.spriteHeight = 209
//             this.width = this.spriteWidth / 2
//             this.height = this.spriteHeight / 2
//             this.x = this.game.width
//             this.y = Math.random() * this.game.height * 0.4
//             this.image = ghost
//             this.vx = Math.random() * 0.2 + 0.1
//             this.angle = 0
//             this.curve = Math.random() * 4
//         }

//         update(deltaTime) {
//             super.update(deltaTime)
//             this.y += Math.sin(this.angle) * this.curve
//             this.angle += 0.04
//         }

//         draw() {
//             this.game.ctx.save()
//             this.game.ctx.globalAlpha = 0.5
//             super.draw()
//             this.game.ctx.restore()
//         }
//     }

//     class Spider extends Enemy {
//         constructor(game) {
//             /**@type Game */
//             super(game)
//             this.spriteWidth = 310
//             this.spriteHeight = 175
//             this.width = this.spriteWidth / 2
//             this.height = this.spriteHeight / 2
//             this.x = this.game.width * Math.random()
//             this.y = -this.height
//             this.image = spider
//             this.vx = 0
//             this.vy = Math.random() * 0.1 + 0.1
//             this.maxLength = Math.random() * this.game.height
//         }

//         update(deltaTime) {
//             super.update(deltaTime)
//             this.y += this.vy * deltaTime
//             if (this.y > this.maxLength) this.vy = -this.vy
//             if (this.y < -this.height) this.markedForDeletion = true
//         }
//         draw() {

//             /**@type CanvasRenderingContext2D  */
//             const ctx = this.game.ctx
//             ctx.beginPath()
//             ctx.moveTo(this.x + this.width / 2, 0)
//             ctx.lineTo(this.x + this.width / 2, this.y + 10)
//             ctx.stroke()
//             super.draw()
//         }
//     }

//     const game = new Game(ctx, canvas.width, canvas.height)
//     let lastTimestamp = 0
//     function animate(timeStamp) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height)
//         //使不用帧率下的刷新频率一致
//         const deltaTime = timeStamp - lastTimestamp
//         lastTimestamp = timeStamp
//         game.update(deltaTime)
//         game.draw()
//         requestAnimationFrame(animate)
//     }

//     animate(0)
// }()


export class Enemy {
    constructor(game) {
        /**@type Game */
        this.game = game
        this.width = 100
        this.height = 100
        this.x = this.game.width
        this.y = 0
        this.markedForDeletion = false
        this.frameX = 0
        this.maxFrame = 5
        this.fps = 20
        this.frameInterval = 1000 / this.fps
        this.frameTimer = 0
        this.speedX = 0
        this.speedY = 0
        this.markedForDeletion = false
    }

    update(deltaTime) {
        this.x -= this.speedX + this.game.speed
        this.y += this.speedY

        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) {
                this.frameX++
            } else {
                this.frameX = 0
            }
            this.frameTimer = 0
        } else {
            this.frameTimer += deltaTime
        }

        if (this.x + this.width < 0) this.markedForDeletion = true
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super(game)
        this.speedX = Math.random() + 1
        this.speedY = 0
        this.width = 60
        this.height = 44
        this.x = this.game.width * (1 + Math.random() * 0.5)
        this.y = Math.random() * this.game.height * 0.5
        this.image = document.getElementById('enemy_fly')
        this.spriteWidth = 200
        this.spriteHeight = 200
        this.maxFrame = 5
        this.angle = 0
        this.va = Math.random() * 0.1 + 0.1
    }

    update(deltaTime) {
        super.update(deltaTime)
        this.angle += this.va
        this.y += Math.sin(this.angle)
    }
}

export class GroundEnemy extends Enemy {
    constructor(game) {
        super(game)
        this.width = 60
        this.height = 87
        this.x = this.game.width
        this.y = this.game.height - this.height - this.game.gameMargin
        this.image = document.getElementById('enemy_plant')
        this.maxFrame = 1
    }
}

export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super(game)
        this.width = 120
        this.height = 144
        this.x = this.game.width
        this.y = Math.random() * this.game.height * 0.5
        this.image = document.getElementById('enemy_spider_big')
        this.speedX = 0
        this.speedY = Math.random() > 0.5 ? 1 : -1
        this.maxFrame = 5
    }

    update(deltaTime) {
        super.update(deltaTime)
        if (this.y > this.game.height - this.height - this.game.gameMargin) this.speedY *= -1
        if (this.y < -this.height) this.markedForDeletion = true
    }   

    draw(context){
        super.draw(context)
        context.beginPath()
        context.moveTo(this.x + this.width/2, 0)
        context.lineTo(this.x + this.width/2, this.y + 50)
        context.stroke()
    }
}