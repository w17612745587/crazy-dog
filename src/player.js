import { states, StandingLeft, StadingRight, SittingLeft, SittingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight } from "./state.js";

export default class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states = [new StandingLeft(this), new StadingRight(this), new SittingLeft(this), new SittingRight(this), new RunningLeft(this), new RunningRight(this), new JumpingLeft(this), new JumpingRight(this)]
        this.currentState = this.states[0];
        this.width = 200;
        this.height = 181.83;
        this.x = 0;
        this.y = this.gameHeight - this.height;
        this.image = document.getElementById("dog");
        this.frameX = 0;
        this.frameY = 1;
        this.maxFrame = 6;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.speed = 0;
        this.vy = 0;
        this.weight = 1;
        this.maxSpeed = 10;
    }

    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(input, deltaTime) {
        this.currentState.handleInput(input);
        this.x += this.speed;
        if (this.x < 0) this.x = 0;
        else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;

        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;

        if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;

        this.frameTimer += deltaTime;
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
            this.frameTimer = 0;
        }
    }

    onGround() {
        return this.y >= this.gameHeight - this.height;
    }

    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}