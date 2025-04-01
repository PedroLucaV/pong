let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

let playerWidth = 10;
let playerHeight = 50;
let playerSpeed = 0;

let player1 = {
    x:10,
    y: boardHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocity : playerSpeed
}

let player2 = {
    x: boardWidth - playerWidth - 10,
    y: boardHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocity : playerSpeed
}

let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: 1,
    velocityY: 1
}

let player1Score = 0;
let player2Score = 0;

window.onload = () => {
    board = document.querySelector('#board');
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext('2d'); //Drawing context

    //drawn player1
    context.fillStyle = 'skyblue';
    context.fillRect(player1.x, player1.y, player1.width, player1.height);
    
    requestAnimationFrame(update);
    document.addEventListener('keyup', movePlayer);
}

const outOfBounds = (yPosition) => {
    return yPosition < 0 || yPosition +playerHeight > boardHeight;
}

const update = () => {
    requestAnimationFrame(update);
    context.clearRect(0, 0, boardWidth, boardHeight); //clear the board
    context.fillStyle = 'skyblue';
    // player1.y += player1.velocity;
    let nextPlayer1Y = player1.y + player1.velocity;
    if(!outOfBounds(nextPlayer1Y)){
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);
    // player2.y += player2.velocity;
    let nextPlayer2Y = player2.y + player2.velocity;
    if(!outOfBounds(nextPlayer2Y)){
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    context.fillStyle = 'white'
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    context.fillRect(ball.x, ball.y, ball.width, ballHeight)
    

    if (ball.y <= 0 || (ball.y + ball.height >= boardHeight)){
        ball.velocityY *= -1
    }

    if(detecCollision(ball, player1)){
        if(ball.x <= player1.x + player1.width){
            ball.velocityX *= -1
        }
    }else if(detecCollision(ball, player2)){
        if(ball.x + ballWidth >= player2.x){
            ball.velocityX *= -1
        }
    }

    if(ball.x <0){
        player2Score++;
        resetGame(-1);
    }else if(ball.x + ballWidth >boardWidth){
        player1Score++;
        resetGame(1)
    }
    context.font = "45px sans-serif"
    context.fillText(player1Score, boardWidth/5, 45)
    context.fillText(player2Score, boardWidth*4/5 -45, 45)

    for (let i = 10; i <boardHeight; i+=25){
        context.fillRect(boardWidth/2-10, i, 5, 5)
    }
}

const movePlayer = (event) => {
    //player1
    if(event.code == 'KeyW'){
        player1.velocity = -3;
    }else if(event.code == 'KeyS'){
        player1.velocity = 3;
    }

    if(event.code == 'ArrowUp'){
        player2.velocity = -3;
    }else if(event.code == 'ArrowDown'){
        player2.velocity = 3;
    }
}

const detecCollision = (a, b) => {
    return a.x < b.x +b.width && 
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
}

const resetGame = (direction) => {
    ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: direction,
    velocityY: 1
}
}