export default class InputHandler {
    constructor() {
        this.lastKey = ''
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    this.lastKey = 'PRESS left'
                    break
                case 'ArrowRight':
                    this.lastKey = 'PRESS right'
                    break
                case 'ArrowUp':
                    this.lastKey = 'PRESS up'
                    break
                case 'ArrowDown':
                    this.lastKey = 'PRESS down'
                    break
            }
        })

        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    this.lastKey = 'RELEASE left'
                    break
                case 'ArrowRight':
                    this.lastKey = 'RELEASE right'
                    break
                case 'ArrowUp':
                    this.lastKey = 'RELEASE up'
                    break
                case 'ArrowDown':
                    this.lastKey = 'RELEASE down'
                    break
            }
        })
    }
}


// export default class InputHandler {
//     constructor() {
//         this.keys = []
//         window.addEventListener('keydown', (e) => {
//             if (
//                 ((e.key === 'ArrowDown' || e.key === 's')
//                     || (e.key === 'ArrowUp' || e.key === 'w')
//                     || (e.key === 'ArrowLeft' || e.key === 'a')
//                     || (e.key === 'ArrowRight' || e.key === 'd')
//                     || e.key === 'Enter')
//                 && this.keys.indexOf(e.key) === -1) {
//                 this.keys.push(e.key)
//             }
//             console.log(this.keys)
//         })

//         window.addEventListener('keyup', (e) => {
//             if (
//                 ((e.key === 'ArrowDown' || e.key === 's')
//                     || (e.key === 'ArrowUp' || e.key === 'w')
//                     || (e.key === 'ArrowLeft' || e.key === 'a')
//                     || (e.key === 'ArrowRight' || e.key === 'd')
//                     || e.key === 'Enter')
//             ) {
//                 this.keys.splice(this.keys.indexOf(e.key), 1)
//             }
//         })
//     }
// }