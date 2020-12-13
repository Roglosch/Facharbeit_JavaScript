"use strict";
let interval;
const imgPath = "../Img/";
const imgSrc = [
    {src: "orc.jpg", name: "Orc"},
    {src: "dwarf.png", name: "Dwarf"},
    {src: "elf.png", name: "Elf"}
];
let activeImage = [];
let hitsNeededForWinning;

function getRandomValue(range, min) {
    return Math.floor(Math.random() * range) + min;
}

function handleGameEnded(messageText, messageColor) {
    document.getElementById("messageBox").style.visibility = "visible";
    document.getElementById("message").innerText = messageText;
    document.getElementById("message").style.color = messageColor;
    clearInterval(interval);
    for (let i = 1; i <= 3; i++) {
        const targetImage = document.getElementById("imgTarget" + i);
        targetImage.style.visibility = "hidden"
    }
}

function checkAndHandleWinOrLose(hits, remainingLife) {
    if (hits >= hitsNeededForWinning) {
        handleGameEnded("Herzlichen Glückwunsch, Sie haben gewonnen!", "whitesmoke")
    } else if (remainingLife <= 0) {
        handleGameEnded("Der Hochkönig hat Sie aufgrund Ihrer Taten verbannt!", "red")
    }
}

function setNewButtonPosition(element) {
    let valueX = getRandomValue(500, 1);
    let valueY = getRandomValue(500, 1);
    // Es werden mit Hilfe der Funktion neue Werte für die Position bestimmt

    let valueSize = getRandomValue(20, 5);
    // Es wird mit Hilfe der Funktion ein neuer Wert für die Größe bestimmt

    element.style.left = valueX + 'px';
    element.style.top = valueY + 'px';
    element.style.height = valueSize + '%';
    // Die oben bestimmten Werte werden eingesetzt
}

function handleTargetClick(number) {
    const displayTargetHits = document.getElementById('displayHits');
    const displayLifeCount = document.getElementById("displayLife");

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
    checkAndHandleWinOrLose(displayTargetHits.innerText, displayLifeCount.innerText);
    // Die Funktion zur Überprüfung der Gewinnenvoraussetzung und der Todesvoraussetzung wird aufgerufen
}

function startGame(liveCount, winHits) {
    document.getElementById("displayLife").innerText = liveCount;
    document.getElementById("displayHits").innerText = "0";
    document.getElementById("messageBox").style.visibility = "hidden";
    hitsNeededForWinning = winHits;
    for (let i = 1; i <= 3; i++) {
        const targetImage = document.getElementById("imgTarget" + i);
        targetImage.style.visibility = "visible"
    }
    interval = setInterval(runThroughGameLoopOnce, 750)
}

function runThroughGameLoopOnce() {
    for (let i = 1; i <= 3; i++) {
        const targetImage = document.getElementById("imgTarget" + i);
        setNewButtonPosition(targetImage);

        changeImage(targetImage, i)
    }
}

function changeImage(targetImage, number) {
    const imgNumber = Math.floor(Math.random() * imgSrc.length);
    activeImage[number] = imgSrc[imgNumber].name;
    targetImage.src = imgPath + imgSrc[imgNumber].src;
}

function endGame() {
    clearInterval(interval)
}