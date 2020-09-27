//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min , max),
    guessesLeft = 3;

//UI elements
const game = document.querySelector("#game"),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector(".max-num"),
      guessBtn = document.querySelector("#guess-btn"),
      guessInput = document.querySelector("guess-input"),
      message = document.querySelector(".message");

//Assign UI min - max numbers to show in the app
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener("mousedown", function(e){
        if(e.target.className === "play-again"){
            window.location.reload();
        }
})

//Listen for guess
guessBtn.addEventListener("click", function(){
        //from a string into a number parseInt
    let guess = parseInt(guessInput.value);

        //Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, "red");
        guess.Input.style.borderColor = "red";
    }else{
         //Check if won
         if(guess === winningNum){
         //Game over - won
          gameOver(true, `${winningNum} is the correct number. You win!!!`) ; 
         }else{
             //Incorrect number
             guessesLeft -= 1;

             if(guessesLeft === 0){
                 //Game over - lost
                 gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);
             }else{
                 //Game continuos answer wrong
                 //Change border color
                 guessInput.style.borderColor = "orange";
                 
                 //Clear input
                 guessInput.value = "";

                 //Wrong number + guesses left
                 setMessage(`${guess} is not correct, ${guessesLeft}`, "orange");
             }
         }
    }
});

//Set message function
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;

}

//Game over
function gameOver(won, msg){
    let color;
    won === true ? color = "green" : color = "red";

    //disable input
    guessInput.disabled = true;

    //Change border color
    guessInput.style.borderColor = color;

    //Set text color
    message.style.color = color;

    //Won message
    setMessage(msg);

    //Play again?
    guessBtn.value = "Play again";

    //Append a class to the element
    guessBtn.className += "play-again"

}

//Get winning number
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max-min+1) + min);
}

