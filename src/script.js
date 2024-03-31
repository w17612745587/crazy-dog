window.addEventListener('load', function () {
    /**@type HTMLCanvasElement */
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800
    canvas.height = 720
    let gameOver = false
    let gameStart = false
    class InputHandler {
        constructor() {
            this.keys = []
            this.touchY = 0
            this.touchX = 0
            this.touchTreshold = 30
            window.addEventListener('keydown', e => {
                if (this.keys.indexOf(e.key) !== -1) return
                if (gameOver && e.key === 'Enter') {
                    restartGame()
                }
                switch (e.key) {
                    case 'ArrowDown':
                    case 'ArrowRight':
                    case 'ArrowUp': this.keys.push(e.key); break;
                    case 'ArrowLeft': this.keys.push(e.key); break;
                    default:
                }
            })

            window.addEventListener('keyup', e => {

                if (this.keys.indexOf(e.key) === -1) return
                this.keys.splice(this.keys.indexOf(e.key), 1)
                console.log('keyup', e.key, this.keys)
            })

            window.addEventListener('touchstart', e => {
                this.touchY = e.changedTouches[0].pageY
                this.touchX = e.changedTouches[0].pageX
            })
            window.addEventListener('touchmove', e => {

                let swipeDistance = e.changedTouches[0].pageY - this.touchY
                console.log('touchmove', swipeDistance)
                if (swipeDistance < -this.touchTreshold && this.keys.indexOf('ArrowUp') === -1) this.keys.push('ArrowUp')
                else if (swipeDistance > this.touchTreshold && this.keys.indexOf('ArrowDown') === -1) this.keys.push('ArrowDown')
                
                swipeDistance = e.changedTouches[0].pageX - this.touchX
                if (swipeDistance < -this.touchTreshold && this.keys.indexOf('ArrowLeft') === -1) this.keys.push('ArrowLeft')
                else if (swipeDistance > this.touchTreshold && this.keys.indexOf('ArrowRight') === -1) this.keys.push('ArrowRight')

            })
            window.addEventListener('touchend', e => {
                console.log(this.keys)
                if(gameOver && this.keys.indexOf('ArrowDown') !== -1){
                    restartGame()
                }
                this.keys.splice(this.keys.indexOf('ArrowLeft'), 1)
                this.keys.splice(this.keys.indexOf('ArrowRight'), 1)
                this.keys.splice(this.keys.indexOf('ArrowUp'), 1)
                this.keys.splice(this.keys.indexOf('ArrowDown'), 1)
            })

            window.addEventListener('click', e => {
                if(!gameOver){
                    gameStart = true
                    animate(0)
                    canvas1.requestFullscreen()
                }
            })
        }
    }

    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.width = 200
            this.height = 200
            this.x = 0
            this.y = this.gameHeight - this.height
            this.frameX = 0
            this.frameY = 0
            this.speed = 0
            this.vy = 0
            this.weight = 1
            this.image = document.getElementById('playerImage')
            this.frameX = 0
            this.frameY = 0
            this.maxFrame = 8
            this.fps = 20
            this.frameTimer = 0
            this.frameInterval = 1000 / this.fps

        }

        draw(ctx) {
            ctx.beginPath()
            ctx.strokeStyle = 'white'
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2 + 20, this.width / 3, 0, Math.PI * 2)
            ctx.stroke()
            ctx.drawImage(this.image, this.frameX * this.width, this.frameY, this.width, this.height, this.x, this.y, this.width, this.height)
        }

        update(input, deltaTime, enemies) {
            //碰撞检测
            enemies.forEach(enemy => {
                const dx = (enemy.x + enemy.width / 4 + 5) - (this.x + this.width / 2)
                const dy = (enemy.y + enemy.height / 2) - (this.y + this.height / 2 + 20)
                const distance = Math.sqrt(dx * dx + dy * dy)
                if (distance < enemy.width / 3 + this.width / 3) {
                    console.log('collision')
                    gameOver = true
                }
            })
            this.y += this.vy
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0
                else this.frameX++
                this.frameTimer = 0
            } else {
                this.frameTimer += deltaTime
            }
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speed = 5
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -5
            }
            else {
                this.speed = 0
            }
            if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
                this.vy -= 25
            }
            this.x += this.speed
            if (this.x < 0) this.x = 0
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width
            this.y += this.vy
            if (!this.onGround()) {
                this.vy += this.weight
                this.maxFrame = 5
                this.frameY = 1
            } else {
                this.vy = 0
                this.maxFrame = 8
                this.frameY = 0
            }
            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height
        }

        restart() {
            this.x = 100
            this.y = this.gameHeight - this.height
            this.maxFrame = 8
            this.frameX = 0
            this.frameY = 0
        }

        onGround() {
            return this.y >= this.gameHeight - this.height
        }
    }

    class Background {
        constructor(gameWidth, gameHeight) {

            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.image = document.getElementById('backgroundImage')
            this.x = 0
            this.y = 0
            this.width = 2400
            this.height = 720
            this.speed = 5
        }

        draw(ctx) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
            ctx.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height)
        }

        update() {
            this.x -= this.speed
            if (this.x < -this.width) {
                this.x = 0
            }
        }

        restart() {
            this.x = 0
        }
    }

    class Enemy {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.spriteWidth = 229
            this.spriteHeight = 171
            this.width = this.spriteWidth / 2
            this.height = this.spriteHeight / 2
            this.image = document.getElementById('enemyImage')
            this.x = this.gameWidth
            this.y = this.gameHeight - this.height
            this.frameX = 0
            this.maxFrame = 5
            this.fps = 20
            this.frameInterval = 1000 / this.fps
            this.frameTimer = 0
            this.speed = 4
            this.markedForDeletion = false
        }

        draw(ctx) {
            ctx.beginPath()
            ctx.strokeStyle = 'white'
            ctx.arc(this.x + this.width / 4 + 5, this.y + this.height / 2, this.width / 3, 0, Math.PI * 2)
            ctx.stroke()
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        }

        update(deltaTime) {
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0
                else this.frameX++
                this.frameTimer = 0
            } else {
                this.frameTimer += deltaTime
            }
            this.x -= this.speed
            if (this.x < -this.width) {
                score++
                this.markedForDeletion = true
            }
        }
    }

    let enemyTimer = 0
    let enemyInterval = 10000
    function handleEnemies(deltaTime) {
        if (enemyTimer > enemyInterval) {
            enemies.push(new Enemy(canvas.width, canvas.height))
            enemyTimer = 0
        } else {
            enemyTimer += deltaTime
        }
        enemies = enemies.filter(item => !item.markedForDeletion)
        enemies.forEach(item => {
            item.draw(ctx)
            item.update(deltaTime)
        })
    }

    function displayStatusText() {
        ctx.textAlign = 'left'
        ctx.fillStyle = 'black'
        ctx.font = '40px Helvetica'
        ctx.fillText('Score: ' + score, 20, 50)
        ctx.fillStyle = 'white'
        ctx.fillText('Score: ' + score, 20, 52)
    }

    function displayGameOverText() {
        ctx.fillStyle = 'white'
        ctx.font = '40px Helvetica'
        ctx.textAlign = 'center'
        ctx.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2)
        ctx.fillStyle = 'red'
        ctx.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2 + 2)
        ctx.font = '30px Helvetica'
        ctx.fillStyle = 'white'
        ctx.fillText('press enter to restart', canvas.width / 2, canvas.height / 2 + 45)
    }

    function gameStartText() {
        ctx.font = '30px Helvetica'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.fillText('click to start!', canvas.width / 2, canvas.height / 2 + 2)

    }

    function restartGame() {
        player.restart()
        background.restart()
        enemies = []
        score = 0
        gameOver = false
        animate(0)
    }



    let score = 0
    let enemies = []
    const input = new InputHandler()
    const player = new Player(canvas.width, canvas.height)
    const background = new Background(canvas.width, canvas.height)
    enemies.push(new Enemy(canvas.width, canvas.height))
    let lastTime = 0
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        background.draw(ctx)
        // background.update()
        player.draw(ctx)
        player.update(input, deltaTime, enemies)
        handleEnemies(deltaTime)
        displayStatusText()
        if (!gameStart) {
            gameStartText()
        } else {
            if (!gameOver) {
                requestAnimationFrame(animate)
            } else {
                displayGameOverText()
            }
        }

    }

    animate(0)
})