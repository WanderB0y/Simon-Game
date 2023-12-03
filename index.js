const greenButton = document.querySelector('#green');
const redButton = document.querySelector('#red');
const yellowButton = document.querySelector('#yellow');
const blueButton = document.querySelector('#blue');

let arrayNumColours = [];
let arrayNumColoursClone = [];
let level = arrayNumColours.length;
let goPlay = false;
let countLevel = 0;




greenButton.addEventListener('click', (e) => {
    animateClassListAndPlayAudio(greenButton, greenButton.getAttribute('id'));

    if (goPlay){
        arrayNumColoursClone.push(1);

        for(let i = 0; i < arrayNumColours.length; i++){
            if(arrayNumColours[i] === arrayNumColoursClone[i]){
                continue;
            } else{

            }
        }
    }
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


function randomColourNumberGenerator() {
    
    return Math.floor(Math.random() * 4);
}

function resetCurrentStats (){
    arrayNumColours.splice(0, arrayNumColours.length);
    countLevel = 0;
}




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



simulateClick(0, arrayNumColours.length, arrayNumColours)
console.log(randomColourNumberGenerator())