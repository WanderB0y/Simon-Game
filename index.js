const greenButton = document.querySelector('#green');
const redButton = document.querySelector('#red');
const yellowButton = document.querySelector('#yellow');
const blueButton = document.querySelector('#blue');
const levelTitle = document.querySelector('#level-title');
const bodyColor = document.body;
 
let arrayNumColours = [];
let arrayNumColoursInput = [];
let level = arrayNumColours.length;
let goPlay = false;
let countLevel = 5;

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

    if(goPlay){
        arrayNumColoursInput.push(0);
        compareArray();
        console.log(arrayNumColours)
        console.log(arrayNumColoursInput)
    }
});

redButton.addEventListener('click', (e) => {
    animateClassListAndPlayAudio(redButton, redButton.getAttribute('id'));
    
    if(goPlay){
        arrayNumColoursInput.push(1);
        compareArray();
        console.log(arrayNumColours)
        console.log(arrayNumColoursInput)
    }
});

yellowButton.addEventListener('click', (e) => {
    animateClassListAndPlayAudio(yellowButton, yellowButton.getAttribute('id'));
    
    if(goPlay){
        arrayNumColoursInput.push(2);
        compareArray();
        console.log(arrayNumColours)
        console.log(arrayNumColoursInput)
    }
});

blueButton.addEventListener('click', (e) => {    
    animateClassListAndPlayAudio(blueButton, blueButton.getAttribute('id'));
    
    if(goPlay){
        arrayNumColoursInput.push(3);
        compareArray();
        console.log(arrayNumColours)
        console.log(arrayNumColoursInput)
    }
});


const compareArray = () => {
    for(let i = 0; i < arrayNumColoursInput.length; i++){
        if(arrayNumColours[i] !== arrayNumColoursInput[i]){
            errorInput();
            levelTitle.textContent = "Wrong Button";
        }
    }
}



const goPlayGame = () => {
    if(goPlay){
        levelTitle.textContent = `Level ${countLevel}`;

        blueButton.style.pointerEvents = 'none'
        
        levelIndication();

        setTimeout(() => {
            blueButton.style.pointerEvents = 'auto';
            console.log("Done")
        }, simulateClick(0, countLevel, arrayNumColours));
    } else{
        errorInput();
    }
}

// Will simulate the click
function simulateClick(i, level, arrayNumColours) {
    let time = 0;
    if (i < level) {
        switch(arrayNumColours[i]){
            case 0:
                animateClassListAndPlayAudio(greenButton, greenButton.getAttribute('id'));
                break;
            case 1:
                animateClassListAndPlayAudio(redButton, redButton.getAttribute('id'));
    
                break;
            case 2:
                animateClassListAndPlayAudio(yellowButton, yellowButton.getAttribute('id'));
                break;
            case 3:
                animateClassListAndPlayAudio(blueButton, blueButton.getAttribute('id'));
                break;
            }
        setTimeout(() => {
            time += 1000;
            console.log("Hello World");
            simulateClick(i + 1, countLevel, arrayNumColours);
        }, 1000); // Waits for 1 second (1000 milliseconds) before the next call

    }
    return time;
}

// This function will play the aiuddio an will animate particulr class
const animateClassListAndPlayAudio = (buttonColour, buttonColourID) => {
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

const errorInput = () => {
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

const resetCurrentStats = () => {
    goPlay = false;
    arrayNumColours.splice(0, arrayNumColours.length);
    arrayNumColoursInput.splice(0, arrayNumColoursInput.length);
    countLevel = 1;
}

//Check if the game is playable


const levelIndication = () => {
    for(let i = 0; i < countLevel; i++){
        arrayNumColours.push(generateRandNumber().next().value);
    }
}
 
