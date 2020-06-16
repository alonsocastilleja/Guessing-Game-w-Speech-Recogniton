const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

console.log("Number: ", randomNum);


// Initialize a speech recognition object 
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

// Create a variable to work with the Speech Recognition Object
let recogntion = new window.SpeechRecognition();

// Start the game 
recogntion.start();

// Listen for the result event 
SpeechRecognition.addEventListener('result', onSpeak);

// Create the onSpeak function
function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    console.log(msg);
}

function writeMessage(msg) {
    msgEl.innerHTMl = `
        <div> You Said: </div>
        <span class="box"> ${msg} </span>
        ;
    `
};

function checkNumber(msg) {
    const num = +msg;

    //Check if a valid number 
    if (Number.isNaN(num)) {
        msgEl.innerHTML += '<div> THat is not a valid number </div>'
        return;
    }
    //Check if number is in range 
    if (num > 100 || num < 1) {
        msgEl.innerHTML += '<div> Your number must be between 1-100 </div>';
        return;
    }
    // Check number against Randomly generated number
    if (num === randomNum) {
        document.body.innerHTMl = `
        <h2>Congrats! You guessed the number <br><br>
        It was ${num} </h2>
        <button class="play-again" id="play-again"> Play Again </button>`;
    } else if (num > randomNum) {
        msgEl.innerHTML += '<div> GO LOWER! </div>';
    } else {
        msgEl.innerHTML += '<div> GO HIGHER! </div>';
    }
}

writeMessage(msg);
checkNumber(msg);


// Allow user to continue to guess - End
recogntion.addEventListener('end', () => recogntion.start());


// Make the play button work 
document.body.addEventListener('click', e => {
    if(e.target.id == 'play-again'){
        window.location.reload();
    }
});
