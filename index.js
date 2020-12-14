// "use strict"; is needed to be able to use the latest version of Java scripts.
"use strict";

// Variables are declared that can be used in all of the following functions
const imgPath = "./Img/";
const imgSrc = [
    {src: "orc.jpg", name: "Orc"},
    {src: "dwarf.png", name: "Dwarf"},
    {src: "elf.png", name: "Elf"}
];
let activeImage = [];
let interval;
let hitsNeededForWinning;
let playing = false;

//------------------------------------------------------------------------
// General Auxiliary Functions
//------------------------------------------------------------------------
// Returns a random integer with the distance and the minimum number specified
function getRandomValue(range, min) {
    return Math.floor(Math.random() * range) + min;
}

//------------------------------------------------------------------------
// Manual Triggered Events
//------------------------------------------------------------------------
// Starts the game
function startGame(liveCount, winHits) {
    if (!playing) {
        playing = true;
        // Sets the visible values to the start values
        document.getElementById("displayLife").innerText = liveCount;
        document.getElementById("displayHits").innerText = "0";
        document.getElementById("messageBox").style.visibility = "hidden";
        hitsNeededForWinning = winHits;
        // Makes images visible
        for (let i = 1; i <= 3; i++) {
            const targetImage = document.getElementById("imgTarget" + i);
            targetImage.style.visibility = "visible"
        }
        // Starts game loop
        interval = setInterval(runThroughGameLoopOnce, 750)
    }
}

// Stops the game
function endGame() {
    clearGameArea();
}

// Reacts to the target click
function handleTargetClick(number) {
    // Gets the values
    const displayTargetHits = document.getElementById('displayHits');
    const displayLifeCount = document.getElementById("displayLife");
    // Influences the values depending on the hit
    switch (activeImage[number]) {
        case "Dwarf":
            displayLifeCount.innerText--;
            break;
        case "Orc":
            displayTargetHits.innerText++;
            break;
        case "Elf":
            displayTargetHits.innerText = (Number(displayTargetHits.innerText) + 2).toString();
            break;
        default:
            displayTargetHits.innerText++;
    }
    //Function to check the win condition and the death condition is called up
    checkAndHandleWinOrLose(displayTargetHits.innerText, displayLifeCount.innerText);
}

//------------------------------------------------------------------------
// Game Loop
//------------------------------------------------------------------------
function runThroughGameLoopOnce() {
    // Is responsible for the values of the three images
    for (let i = 1; i <= 3; i++) {
        const targetImage = document.getElementById("imgTarget" + i);
        setNewButtonProperties(targetImage);
        changeImage(targetImage, i)
    }
}

// Sets new button properties
function setNewButtonProperties(element) {
    // New values for the position are determined with the help of the function
    let valueX = getRandomValue(500, 1);
    let valueY = getRandomValue(500, 1);

    // A new value for the size is determined with the help of the function
    let valueSize = getRandomValue(20, 5);

    // The values determined above are used
    element.style.left = valueX + 'px';
    element.style.top = valueY + 'px';
    element.style.height = valueSize + '%'
}

// Changes the Image
function changeImage(targetImage, number) {
    const imgNumber = Math.floor(Math.random() * imgSrc.length);
    activeImage[number] = imgSrc[imgNumber].name;
    targetImage.src = imgPath + imgSrc[imgNumber].src;
}

//------------------------------------------------------------------------
// Win / Lose Checks
//------------------------------------------------------------------------
// Decides on win or lose situation
function checkAndHandleWinOrLose(hits, remainingLife) {
    if (hits >= hitsNeededForWinning) {
        handleGameEnded("Herzlichen Glückwunsch, Sie haben gewonnen!", "whitesmoke")
    } else if (remainingLife <= 0) {
        handleGameEnded("Der Hochkönig hat Sie aufgrund Ihrer Taten verbannt!", "red")
    }
}

// Performs win or lose situation
function handleGameEnded(messageText, messageColor) {
    document.getElementById("messageBox").style.visibility = "visible";
    document.getElementById("message").innerText = messageText;
    document.getElementById("message").style.color = messageColor;
    clearGameArea()
}

// hides objects on the game area
function clearGameArea(){
    clearInterval(interval);
    for (let i = 1; i <= 3; i++) {
        const targetImage = document.getElementById("imgTarget" + i);
        targetImage.style.visibility = "hidden";
    }
    playing = false;
}