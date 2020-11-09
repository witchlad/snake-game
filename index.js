const grid = document.querySelector(".grid")
const startButton = document.getElementById("start")
const scoreDisplay = document.getElementById("score")
const rightButton = document.getElementById("btn-right")
const leftButton = document.getElementById("btn-left")
const upButton = document.getElementById("btn-up")
const downButton = document.getElementById("btn-down")
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.8
let timerId = 0

function createGrid() {
    for (var i = 0; i < width*width; i++){
       const square = document.createElement("div") // creating 100 of divs

       square.classList.add("square") // adding "square" class to newly created squares, so we can see, and style them
       
       grid.appendChild(square) // putting newly created squares into our grid
       
       squares.push(square) // pushing created squares into array
    }
    
}

createGrid()

currentSnake.forEach(index => squares[index].classList.add("snake")) //  index can me named whatever

function startGame(){
    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove the apple
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    //re add new score to browser
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
    generateApple()
    //readd the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
}

function move(){
    if (
        (currentSnake[0] + width >= width*width && direction == width) || // condition if snake hits bottom wall
        (currentSnake[0] - width < 0 && direction == -width) || // condition if snake hits top wall
        
        (currentSnake[0] % width === width - 1 && direction == 1) || // condition if snake hits right wall
        
        (currentSnake[0] % width === 0 && direction == -1) || // condition if snake hits left wall
        
        squares[currentSnake[0] + direction].classList.contains("snake") // if snake "hits" itself
    ) 
    return clearInterval(timerId)
    
    
    //remove last element from snake array
    const tail = currentSnake.pop()
    console.log(tail)
    console.log(currentSnake)
    //remove styling from deleted element
    squares[tail].classList.remove("snake")
    //adding new element to snake array
    currentSnake.unshift(currentSnake[0] + direction)
    //styling new snake element 
    squares[currentSnake[0]].classList.add("snake")
    
    
    // what if sneaks head hits apple 
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('snake')
        console.log(tail)
        //grow our snake array
        currentSnake.push(tail)
        console.log(currentSnake)
        //generate new apple
        generateApple()
        //add one to the score
        score++
        //display our score
        scoreDisplay.textContent = score
        //speed up our snake
        clearInterval(timerId)
        console.log(intervalTime)
        intervalTime = intervalTime * speed
        console.log(intervalTime)
        timerId = setInterval(move, intervalTime)
    }
}


function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
} 
generateApple()


// e is a shortcut for event
function control(e){ 
    if(e.keyCode === 37){ 
        direction = -1
    } else if (e.keyCode === 38){  
        direction = -10  // - width
    } else if (e.keyCode === 39){ 
        direction = 1   
    } else if (e.keyCode === 40){   
        direction = 10  // + width
    }
}

document.addEventListener("keyup", control)
startButton.addEventListener("click", startGame)
rightButton.addEventListener("click", function(){
    direction = 1
})
leftButton.addEventListener("click", function(){
    direction = -1
})
upButton.addEventListener("click", function(){
    direction = -10
})
downButton.addEventListener("click", function(){
    direction = 10
})
