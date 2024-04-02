import Background from "./background.js"
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from "./enemy.js"
import InputHandler from "./input.js"
import Player from "./player.js"
import { drawStatusText } from './utils.js'
window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Game {
        constructor(width, height) {
            this.width = width
            this.height = height
            this.gameMargin = 88
            this.speed = 1
            this.maxSpeed = 3
            this.enemies = []
            this.enemyInterval = 1000
            this.enemyTimer = 0
            this.score = 0
            this.background = new Background(this)
            this.player = new Player(this)
            this.input = new InputHandler(this)
        }

        update(deltaTime) {
            this.background.update()
            this.player.update(this.input.lastKey, deltaTime)
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy()
                this.enemyTimer = 0
            } else this.enemyTimer += deltaTime

            this.enemies.forEach(enemy => {
                enemy.update(deltaTime)
                if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1)
            })
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
        }

        draw(context) {
            drawStatusText(context, this.input, this.player)
            this.background.draw(context)
            this.player.draw(context)
            this.enemies.forEach(enemy => {
                enemy.draw(context)
            })
        }

        addEnemy() {
            if (Math.random() < 0.33) this.enemies.push(new ClimbingEnemy(this))
            else if (Math.random() < 0.66) this.enemies.push(new FlyingEnemy(this))
            else this.enemies.push(new GroundEnemy(this))
        }
    }

    const game = new Game(canvas.width, canvas.height)
    let lastTime = 0
    function animate(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const deltaTime = timestamp - lastTime
        lastTime = timestamp
        game.update(deltaTime)
        game.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate(0)
})