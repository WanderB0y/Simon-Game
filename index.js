const greenButton = document.querySelector('#green');
const redButton = document.querySelector('#red');
const yellowButton = document.querySelector('#yellow');
const blueButton = document.querySelector('#blue');
const levelTitle = document.querySelector('#level-title');
const bodyColor = document.body;
 
let arrayNumColours = [];
let arrayNumColoursClone = [];
let level = arrayNumColours.length;
let goPlay = false;
let countLevel = 1;

document.addEventListener('keypress', function(e){
    if(e.key === 'a'){
        goPlay = true;
        goPlayGame();
    }else{
        errorInput();
    }
})

greenButton.addEventListener('click', (e) => {
    animateClassListAndPlayAudio(greenButton, greenButton.getAttribute('id'));
});

redButton.addEventListener('click', (e) => {
    animateClassListAndPlayAudio(redButton, redButton.getAttribute('id'));
});

yellowButton.addEventListener('click', (e) => {
    animateClassListAndPlayAudio(yellowButton, yellowButton.getAttribute('id'));
});

blueButton.addEventListener('click', (e) => {    
    animateClassListAndPlayAudio(blueButton, blueButton.getAttribute('id'));
});

const goPlayGame = () => {
    if(goPlay){
        levelTitle.textContent = `Level ${countLevel}`;
        
        levelIndication();
        simulateClick(0, countLevel, arrayNumColours);

        resetCurrentStats();

        console.log("Set Up is Finished")
    } else{
        errorInput();
    }
}

// Will simulate the click
function simulateClick(i, level, arrayNumColours) {
    if (i < level) {
        switch(arrayNumColours[i]){
            case 0:
                greenButton.click();
                break;
            case 1:
                redButton.click();
                break;
            case 2:
                yellowButton.click();
                break;
            case 3:
                blueButton.click();
                break;
            }
    setTimeout(() => {
        simulateClick(i + 1, level, arrayNumColours);
        }, 1000); // Waits for 1 second (1000 milliseconds) before the next call
    }
}

// This function will play the aiuddio an will animate particulr class
function animateClassListAndPlayAudio(buttonColour, buttonColourID){
    //Play Audio
    let colourAudio = `./sounds/${buttonColourID}.mp3`
    const audio = new Audio(colourAudio);
    audio.muted = false;
    audio.play();

    //AnimatedButton
    buttonColour.classList.add('pressed');
    setTimeout(() => {
        buttonColour.classList.remove('pressed')
    }, 200)
}

function errorInput () {
    const audio = new Audio('./sounds/wrong.mp3');
    audio.muted = false;
    bodyColor.classList.add('red');

    setTimeout(() => {
        bodyColor.classList.remove('red')
        audio.play();
    }, 200)
}

const generateRandNumber = function* () {
    yield Math.floor(Math.random() * 4)

}

function resetCurrentStats (){
    goPlay = false;
    arrayNumColours.splice(0, arrayNumColours.length);
    arrayNumColoursClone.splice(0, arrayNumColoursClone.length);
    countLevel = 1;
}

//Check if the game is playable
const checkInputCorrect = () => {
    for(let i = 0; i < level; i++){
        if(arrayNumColours[i] !== arrayNumColoursClone[i]){
            resetCurrentStats();
        }
    }


}
 


const levelIndication = () => {
    for(let i = 0; i < countLevel; i++){
        arrayNumColours.push(generateRandNumber().next().value);
    }
}
 
