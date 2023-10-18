
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


class SnakePart {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
      // the basics (sizes)
  let speed = 10;
  
  let tileCount = 20;
  let tileSize = canvas.width / tileCount - 2;
  
  let headX = 10;
  let headY = 10;
  const snakeParts = [];
  let tailLength = 4;
  
  let appleX = 5;
  let appleY = 5;
  
  let inputsXVelocity = 0;
  let inputsYVelocity = 0;
  
  let xVelocity = 0;
  let yVelocity = 0;
  
  let score = 0;
  
  
  
  const gulpSound = new Audio("gulp.mp3");
  
      //the game loop
  function drawGame() {
    xVelocity = inputsXVelocity;
    yVelocity = inputsYVelocity;
  
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
      return;
    }
  
    clearScreen();
  
    checkAppleCollision();
    drawApple();
    drawSnake();
  
    drawScore();

      // after reaching these scores the speed will increse
    if (score > 15) {
      speed = 15;       // 1st speed
    }
    if (score > 30) {
      speed = 20;       // 2nd speed
    }
    if (score > 50) {
      speed = 25;       // 3rd speed
    }
    setTimeout(drawGame, 1000 / speed);
  }
  
  function isGameOver() {
    let gameOver = false;
  
    if (yVelocity === 0 && xVelocity === 0) {
      return false;
    }
  
        // Border walls = game over
    if (headX < 0) {
      gameOver = true;
    } else if (headX === tileCount) {
        console.log(headX, xVelocity, tileCount)
       gameOver = true;
    }
    else if (headY < 0) {
      gameOver = true;
      console.log(headY, yVelocity)
    } else if (headY === tileCount) {
      gameOver = true;
      console.log(headY, yVelocity, tileCount)
    }
        // when the snakes head touches its body
    for (let i = 0; i < snakeParts.length; i++) {
      let part = snakeParts[i];
      if (part.x === headX && part.y === headY) {
        gameOver = true;
        break;
      }
    }
          // game over
    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "50px Verdana";
  
      if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
          // the game over color way
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "yellow");
        gradient.addColorStop("0.5", "purple");
        gradient.addColorStop("1.0", "red");
        
        ctx.fillStyle = gradient;
  
        ctx.fillText("   Game Over", canvas.width / 6.5, canvas.height / 2);
      }
  
      ctx.fillText("   Game Over", canvas.width / 6.5, canvas.height / 2);
    }

  
    return gameOver;
  }
        // score in top right corner
  function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score, canvas.width - 60, 20);
  }
  
  function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  function drawSnake() {
    ctx.fillStyle = "green";
    for (let i = 0; i < snakeParts.length; i++) {
      let part = snakeParts[i];
      ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
        // snake's tail gets longer after eating more
    snakeParts.push(new SnakePart(headX, headY)); 
    while (snakeParts.length > tailLength) {
      snakeParts.shift(); 
    }
  
    ctx.fillStyle = "green";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
  }
  
  function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
    
  }
  
  function drawApple() {
    ctx.fillStyle = "purple";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
  }
        // food disappeares after collision
  function checkAppleCollision() {
    if (appleX === headX && appleY == headY) {
      appleX = Math.floor(Math.random() * tileCount);
      appleY = Math.floor(Math.random() * tileCount);
      tailLength++;
      score++;
      gulpSound.play();
    }
  }
        // arrow functions to move the snake
  document.body.addEventListener("keydown", keyDown);
  
  function keyDown(event) {
        //up
    if (event.keyCode == 38 || event.keyCode == 87) {
      
      if (inputsYVelocity == 1) return;
      inputsYVelocity = -1;
      inputsXVelocity = 0;
    }
  
        //down
    if (event.keyCode == 40 || event.keyCode == 83) {
      
      if (inputsYVelocity == -1) return;
      inputsYVelocity = 1;
      inputsXVelocity = 0;
    }
  
        //left
    if (event.keyCode == 37 || event.keyCode == 65) {
      
      if (inputsXVelocity == 1) return;
      inputsYVelocity = 0;
      inputsXVelocity = -1;
    }
  
        //right
    if (event.keyCode == 39 || event.keyCode == 68) {
      
      if (inputsXVelocity == -1) return;
      inputsYVelocity = 0;
      inputsXVelocity = 1;
    }
  }

        // function to stop the screen from scrolling while playing
window.addEventListener("keydown", function(e) {
  
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);
  
  drawGame();


    // changing colors function
let ChangeBtn = document.getElementById('ChangeBtn');
function changeBackgroundColor() {
     
     let randomRed = Math.floor(Math.random() * 256);
     let randomGreen = Math.floor(Math.random() * 256);
     let randomBlue = Math.floor(Math.random() * 256);

     document.body.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}
ChangeBtn.addEventListener('click', e=>{
     changeBackgroundColor()
     
})

    // Audio playing and pausing 
const audio = document.getElementById('audio');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');


function playSong() {
    audio.play();
}
    // play button
playButton.addEventListener('click', () => {
    audio.play();
});
    // pause button
pauseButton.addEventListener('click', () => {
    audio.pause();
});
    // repeat function
    function playAndRepeatSong() {
      audio.addEventListener('ended', function () {
     
        audio.currentTime = 0;
        audio.play();
      
      });
      audio.play();

    }
    playAndRepeatSong();



playSong();

let isRunning = false;

      // start game button
document.querySelector(".start-game").addEventListener("click", () => {
    if (!isRunning) {
        startGame();
    } else {
        pauseGame();
    }
});

    
    function startGame() {
        isRunning = true;
        document.getElementById("menu").style.display = "none";
        gameInterval = setInterval(updateGame, 50); 
    }

function pauseGame() {
    isRunning = false;
    clearInterval(gameInterval);
    setInitial();
    document.getElementById("menu").style.display = "flex";
}

      // game objectives pop ups
function showPopupMessage() {
    const button = document.getElementById('game-objectives');
    const popupMessage = button.getAttribute('data-popup-message');
    alert(popupMessage);
    }
    const popupButton = document.getElementById('game-objectives');
    popupButton.addEventListener('click', showPopupMessage);


        // hidding the settings until its clicked
    let audioPlayer = document.querySelector('.audio-player')
    let menu = document.querySelector('#menu')
    let toggle = true;
    let settings = document.querySelector('.settings')

    document.querySelector('.settings').addEventListener('click',e=>{
      if(toggle){
    menu.style.display = "none"
    audioPlayer.style.display = "block"
    document.querySelector('settings').style.display='none'
    toggle = false;
      } 
    })
    document.querySelector('settings').addEventListener('click',e=>{
    settings.style.display = "audio-player"
    document.querySelector('settings').style.display='none'
    toggle = true;
    })
