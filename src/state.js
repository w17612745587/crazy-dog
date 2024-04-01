export const states = {
    STADING_LEFT: 0,
    STADING_RIGHT: 1,
    SITTING_LEFT: 2,
    SITTING_RIGHT: 3,
    Running_LEFT: 4,
    Running_RIGHT: 5,
    JUMPING_LEFT: 6,
    JUMPING_RIGHT: 7,
}

export class State {
    constructor(state) {
        this.state = state;
    }
}

export class StandingLeft extends State {
    constructor(player) {
        super('STADING_LEFT');
        this.player = player;
        this.maxFrame = 6
    }

    enter() {
        this.player.frameY = 1;
        this.player.speed = 0;
    }

    handleInput(input) {
        if (input === 'PRESS right') this.player.setState(states.Running_RIGHT);
        else if(input === 'PRESS left') this.player.setState(states.Running_LEFT);
        else if (input === 'PRESS down') this.player.setState(states.SITTING_LEFT);
        else if (input === 'PRESS up') this.player.setState(states.JUMPING_LEFT);
    }
}

export class StadingRight extends State {
    constructor(player) {
        super('STADING_RIGHT');
        this.player = player;
        this.maxFrame = 6
    }

    enter() {
        this.player.frameY = 0;
        this.player.speed = 0;
    }

    handleInput(input) {
        if (input === 'PRESS left') this.player.setState(states.Running_LEFT);
        else if(input === 'PRESS right') this.player.setState(states.Running_RIGHT);
        else if (input === 'PRESS down') this.player.setState(states.SITTING_RIGHT);
        else if(input === 'PRESS up') this.player.setState(states.JUMPING_RIGHT);
    }
}


export class SittingLeft extends State {
    constructor(player) {
        super('SITTING_LEFT');
        this.player = player;
        this.maxFrame = 5
    }

    enter() {
        this.player.frameY = 9;
        this.player.speed = 0;
    }

    handleInput(input) {
        if (input === 'PRESS right') this.player.setState(states.SITTING_RIGHT);
        else if (input === 'RELEASE down') this.player.setState(states.STADING_LEFT);
    }
}

export class SittingRight extends State {
    constructor(player) {
        super('SITTING_RIGHT');
        this.player = player;
        this.maxFrame = 5
    }

    enter() {
        this.player.frameY = 8;
        this.player.speed = 0;
    }

    handleInput(input) {
        if (input === 'PRESS left') this.player.setState(states.SITTING_LEFT);
        else if (input === 'RELEASE down') this.player.setState(states.STADING_RIGHT);
    }
}

export class RunningLeft extends State {
    constructor(player) {
        super('Running_LEFT');
        this.player = player;
        this.maxFrame = 6
    }

    enter() {
        this.player.frameY = 7;
        this.player.speed = -this.player.maxSpeed
    }

    handleInput(input) {
        if (input === 'PRESS right') this.player.setState(states.Running_RIGHT);
        else if (input === 'RELEASE left') this.player.setState(states.STADING_LEFT);
        else if (input === 'PRESS down') this.player.setState(states.SITTING_LEFT);
        else if(input === 'PRESS up') this.player.setState(states.JUMPING_LEFT);
    }
}

export class RunningRight extends State {
    constructor(player) {
        super('Running_Right');
        this.player = player;
        this.maxFrame = 6
    }

    enter() {
        this.player.frameY = 6;
        this.player.speed = this.player.maxSpeed;
    }

    handleInput(input) {
        if (input === 'PRESS left') this.player.setState(states.Running_LEFT);
        else if (input === 'RELEASE right') this.player.setState(states.STADING_RIGHT);
        else if (input === 'PRESS down') this.player.setState(states.STADING_RIGHT);
        else if(input === 'PRESS up') this.player.setState(states.JUMPING_RIGHT);
    }
}

export class JumpingLeft extends State {
    constructor(player) {
        super('JUMPING_LEFT');
        this.player = player;
        this.maxFrame = 9
    }

    enter() {
        this.player.frameY = 3;
        if (this.player.onGround()) this.player.vy -= 30;
        this.player.speed = -this.player.maxSpeed * 0.5;
    }

    handleInput(input) {
        if (input === 'PRESS right') this.player.setState(states.JUMPING_RIGHT);
        else if (this.player.onGround()) this.player.setState(states.STADING_LEFT);
    }
}

export class JumpingRight extends State {
    constructor(player) {
        super('JUMPING_RIGHT');
        this.player = player;
        this.maxFrame = 9
    }

    enter() {
        this.player.frameY = 2;
        if (this.player.onGround()) this.player.vy -= 30;
        this.player.speed = this.player.maxSpeed * 0.5;
    }

    handleInput(input) {
        if (input === 'PRESS left') this.player.setState(states.JUMPING_LEFT);
        else if (this.player.onGround()) this.player.setState(states.STADING_RIGHT);
    }
}