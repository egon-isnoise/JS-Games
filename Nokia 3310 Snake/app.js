
document.addEventListener('DOMContentLoaded', () =>{

    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 //so first div in our grid
    let appleIndex = 0

    let currentSnake = [2,1,0] // so the div in our grid being 2 (HEAD), 0 (TAIL) and 1 (BODY)
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    // to start and restart the game
    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }


    // function that deals with all the outcomes of the snake
    function moveOutcomes(){
        
        // deals with snake hitting borders and snake hitting self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) ||  // if snakes hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || // if snakes hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || //if snakes hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || // if snakes hits the top
            squares[currentSnake[0] + direction].classList.contains('snake'))// if snake goes into itself
         {
            return clearInterval(interval) // this clears the interval if any of the above happens
        }

        const tail = currentSnake.pop() // removes lsat item of the array and shows it
        squares[tail].classList.remove('snake') // removes class of snake from the TAIL
        currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head of the array
        
        // deals with snake hitting apple
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score ++
            scoreDisplay.textContent = score 
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }

        squares[currentSnake[0]].classList.add('snake')
    }


    // generate new apple once apple is eaten
    function randomApple(){
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        }while(squares[appleIndex].classList.contains('snake'))  // making sure the apple does not appear in a div where the snake already is
        squares[appleIndex].classList.add('apple')
    }



    //assign function to key codes
    function control(e){
        squares[currentIndex].classList.remove('snake')

        if (e.keyCode === 39) {
            direction = 1 // if u press the right arrow on the keyboard, the snake will go right
        }else if (e.keyCode === 38) {
            direction = -width // if we press the up arrow, the snake will go back 10 divs, appearing to go up 
        }else if (e.keyCode === 37) {
            direction = -1 // if you press the left arrow, the snake will go left (back one div)
        }else if (e.keyCode === 40) {
            direction = +width // if we press the down arrow, the snake will go forward 10 divs, appearing to go down
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
})