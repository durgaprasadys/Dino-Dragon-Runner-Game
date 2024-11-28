let score = 0
let highestScore = 0
let cross = true
let isGameOver = false
let jumpSound = new Audio('jump.mp3')
let collisionSound = new Audio('collision.mp3')

document.onkeydown = function (e) {
    if (isGameOver) return

    console.log("Key code is:", e.keyCode)

   
    if (e.keyCode === 38) {
        jumpSound.play()
        let dino = document.querySelector('.dino')
        dino.classList.add('animateDino')
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 800); 
    }

    
    if (e.keyCode === 39) {
        let dino = document.querySelector('.dino')
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
        dino.style.left = dinoX + 112 + "px"
    }

   
    if (e.keyCode === 37) { 
        let dino = document.querySelector('.dino')
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
        dino.style.left = (dinoX - 112) + "px"
    }
};


setInterval(() => {
    if (isGameOver) return

    let dino = document.querySelector('.dino')
    let gameover = document.querySelector('.gameover')
    let obstacles = document.querySelector('.obstacles')

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'))

    let ox = parseInt(window.getComputedStyle(obstacles, null).getPropertyValue('left'))
    let oy = parseInt(window.getComputedStyle(obstacles, null).getPropertyValue('top'))

    let offsetX = Math.abs(dx - ox)
    let offsetY = Math.abs(dy - oy)

    
    if (offsetX < 93 && offsetY < 53) {
        collisionSound.play()
        isGameOver = true
        let restartButton = document.getElementById('restartButton')
        restartButton.style.display = 'block'

        let gameover = document.querySelector('.gameover')
        gameover.style.visibility = 'visible'
        

        if (score > highestScore) {
            highestScore = score
            updateHighestScore(highestScore)
        }

        gameover.innerHTML = `
            Game Over<br>
            Your final score is: ${score}<br>
            Highest score: ${highestScore}<br>
        `
        gameover.appendChild(restartButton);

        obstacles.classList.remove('obstaclesAni')
    } else if (cross && offsetX > 93) {
        score += 1
        updateScore(score)
        cross = false

        setTimeout(() => {
            cross = true
        }, 1000)
    }
}, 100)



if (collision) collisionSound.play()



function updateScore(score) {
    let scoreCont = document.getElementById('scoreCont')
    scoreCont.innerHTML = "Your score: " + score
}


function updateHighestScore(highestScore) {
    let highestScoreCont = document.getElementById('highestScoreCont')
    highestScoreCont.innerHTML = "Highest score: " + highestScore
}


function restartGame() {
    isGameOver = false
    score = 0
    updateScore(score)
    let dino = document.querySelector('.dino')
    let obstacles = document.querySelector('.obstacles')
    let gameover = document.querySelector('.gameover')
    let restartButton = document.getElementById('restartButton')
    

    dino.style.left = '20vw'
    gameover.style.visibility = 'hidden'
    restartButton.style.display = 'none'

    obstacles.classList.add('obstaclesAni')
}

