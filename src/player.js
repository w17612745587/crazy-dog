import { states, StandingLeft, StadingRight, SittingLeft, SittingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight, Standing, Jumping, Falling, Running, Dizzing, Sitting } from "./state.js"

export default class Player {
    constructor(game) {
        this.gameWidth = game.width
        this.gameHeight = game.height
        this.gameMargin = game.gameMargin
        this.game = game
        // this.states = [new StandingLeft(this), new StadingRight(this), new SittingLeft(this), new SittingRight(this), new RunningLeft(this), new RunningRight(this), new JumpingLeft(this), new JumpingRight(this)]
        this.states = [new Standing(this), new Jumping(this), new Falling(this), new Running(this), new Dizzing(this), new Sitting(this)]
        this.currentState = this.states[states.STADING]
        this.width = 100
        this.height = 91.3
        this.x = 0
        this.y = this.gameHeight - this.height - this.gameMargin
        this.image = document.getElementById("player")
        this.frameX = 0
        this.frameY = 0
        this.maxFrame = this.currentState.animation.frame
        this.fps = 20
        this.frameTimer = 0
        this.frameInterval = 1000 / this.fps
        this.speed = 0
        this.vy = 0
        this.weight = 1
        this.maxSpeed = 10
    }

    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    }

    update(input, deltaTime) {
        this.checkCollision()
        this.currentState.handleInput(input)
        this.x += this.speed
        if (this.x < 0) this.x = 0
        else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width

        this.y += this.vy
        if (!this.onGround()) this.vy += this.weight
        else this.vy = 0

        if (this.y > this.gameHeight - this.height - this.gameMargin) this.y = this.gameHeight - this.height - this.gameMargin

        this.frameTimer += deltaTime
        if (this.frameTimer > this.frameInterval) {
            this.maxFrame = this.currentState.maxFrame
            if (this.frameX < this.maxFrame - 1) this.frameX++
            else this.frameX = 0
            this.frameTimer = 0
        }
    }

    onGround() {
        return this.y >= this.gameHeight - this.height - this.gameMargin
    }

    setState(state, speed = 1) {
        this.currentState = this.states[state]
        this.game.speed = this.game.maxSpeed * speed
        this.currentState.enter()
    }

    checkCollision() {
       this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ) {
                enemy.markedForDeletion = true
                this.game.score++
            }
        })
    }
}