const start = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timelist = document.querySelector('#time-list')
const gametime = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['linear-gradient(to right, #b92b27, #1565c0)', 'linear-gradient(to right, #c31432, #240b36)','linear-gradient(to right, #a8c0ff, #3f2b96)','/n',
 'linear-gradient(to right, #00b09b, #96c93d)', 'linear-gradient(to right, #03001e, #7303c0, #ec38bc, #fdeff9)', '/n',
 'linear-gradient(to right, #fffc00, #ffffff)', 'linear-gradient(to right, #fc00ff, #00dbde)']
let time = 0
let score = 0

start.addEventListener('click',(event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timelist.addEventListener('click',(event) => {
    if (event.target.classList.contains('time-btn')) {
        time = +event.target.getAttribute('data-time')
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score ++
        event.target.remove()
        createCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    gametime.innerHTML = `00:${time}`
    createCircle() 
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
    let curTime = --time
    gametime.innerHTML = `00:${curTime}`
    if (curTime < 10) {gametime.innerHTML = `00:0${curTime}`}}
}

function createCircle() {
    const circle = document.createElement('div')
    const size = getNumber(15,60)
    const {width, height} = board.getBoundingClientRect()
    const x = getNumber(0,width - size)
    const y = getNumber(0,height - size)
    const color = getColor() 

    circle.style.background = `${color}`
    circle.classList.add('circle')
    circle.style.height = `${size}px`
    circle.style.width = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)

}

function getNumber(min,max) {
   return Math.round(Math.random() * (max - min) + min)
}

function getColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function finishGame() {
    board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`
    gametime.parentNode.classList.add('hide')
}

