

/* !function () {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    document.body.append(canvas)

    const CANVAS_WIDTH = canvas.width = 600
    const CANVAS_HEIGHT = canvas.height = 600

    const playerImage = new Image()
    playerImage.src = '/assets/imgs/shadow_dog.png'

    const spriteWidth = 575
    const spriteHeight = 523


    let gameFrame = 0 //游戏帧
    const staggerFrames = 5 //交错帧


    const spriteAnimations = {}
    const animationStates = [
        { name: 'idle', frame: 7 },
        { name: 'jump', frame: 7 },
        { name: 'fall', frame: 7 },
        { name: 'run', frame: 9 },
        { name: 'dizz', frame: 11 },
        { name: 'sit', frame: 5 },
        { name: 'roll', frame: 7 },
        { name: 'bite', frame: 7 },
        { name: 'ko', frame: 12 },
        { name: 'getHit', frame: 4 },
    ]

    animationStates.forEach((state, index) => {
        let frames = {
            loc: []
        }

        for (let i = 0; i < state.frame; i++) {
            const posX = i * spriteWidth
            const posY = index * spriteHeight
            frames.loc.push({ x: posX, y: posY })
        }
        spriteAnimations[state.name] = frames
    })


    let state = 'idle'
    function animate() {
        ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_HEIGHT)

        //横轴位置
        let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[state].loc.length

        // let frameX = spriteWidth * position
        const { x, y } = spriteAnimations[state].loc[position] //精灵图动画坐标
        ctx.drawImage(playerImage, x, y, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)

        gameFrame++
        requestAnimationFrame(animate)
    }

    const select = document.createElement('select')
    animationStates.forEach((state) => {
        const option = document.createElement('option')
        option.value = state.name
        option.label = state.name
        select.append(option)
    })
    select.onchange = (e) => {
        state = e.target.value
    }
    document.body.append(select)
    animate()
}()
 */


import Player from './player.js'
import InputHandler from './input.js'
import { drawStatusText } from './utils.js'
window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const player = new Player(canvas.width, canvas.height)
    const input = new InputHandler()
    let lastTime = 0
    function animate(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // player.update(input.lastKey)
        drawStatusText(ctx, input)
        const deltaTime = timestamp - lastTime
        lastTime = timestamp
        player.update(input.lastKey, deltaTime)
        player.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate(0)
})