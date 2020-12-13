"use strict";
let interval;
const imgPath = "../Img/";
const imgSrc = [
    {src: "orc.jpg", name: "Orc"},
    {src: "dwarf.png", name: "Dwarf"},
    {src: "elf.png", name: "Elf"}
];
let activeImage = [];

function getRandomValue(range, min) {
    return Math.floor(Math.random() * range) + min;
}

function checkAndHandleWin(value) {
    if (value >= 10) {
        document.getElementById("headerInformation").innerText = "Herzlichen Glückwunsch, Sie haben gewonnen!"
        clearInterval(interval)
        for (let i = 1; i <= 3; i++) {
            const targetImage = document.getElementById("imgTarget"+i)
            targetImage.style.visibility = "hidden"
        }
        // Es wird die Siegesbedingung geprüft und bei Erfolg die neue Seite aufgerufen
    }
}

function setNewButtonPosition(element) {
    let valueX = getRandomValue(500, 1)
    let valueY = getRandomValue(500, 1)
    // Es werden mit Hilfe der Funktion neue Werte für die Position bestimmt

    let valueSize = getRandomValue(40, 5)
    // Es wird mit Hilfe der Funktion ein neuer Wert für die Größe bestimmt

    element.style.left = valueX + 'px';
    element.style.top = valueY + 'px';
    element.style.height = valueSize + '%';
    // Die oben bestimmten Werte werden eingesetzt
}

function handleTargetClick(number) {
    const headerTargetHits = document.getElementById('headerHits');
    const headerLifeCount = document.getElementById("headerLife");

    switch (activeImage[number]) {
        case "Dwarf":
            headerLifeCount.innerText--;
            break;
        case "Orc":
            headerTargetHits.innerText++;
            break;
        case "Elf":
            headerTargetHits.innerText = (Number(headerTargetHits.innerText)+2).toString();
            break;
        default:
            headerTargetHits.innerText++;
    }
    //TODO: Live = 0
    checkAndHandleWin(headerTargetHits.innerText);
    // Die Funktion zu Überprüfung zum Gewinnen wird aufgerufen
}

function startGame(liveCount) {
    //TODO: Set Lives to LifeCount
    document.getElementById("headerLife").innerText = liveCount;
    for (let i = 1; i <= 3; i++) {
        const targetImage = document.getElementById("imgTarget"+i)
        targetImage.style.visibility = "visible"
    }
    interval = setInterval(runThroughGameLoopOnce, 1000)
}

function runThroughGameLoopOnce() {
    for (let i = 1; i <= 3; i++) {
        const targetImage = document.getElementById("imgTarget"+i)
        setNewButtonPosition(targetImage);

        changeImage(targetImage, i)
    }
}

function changeImage(targetImage, number) {
    const imgNumber = Math.floor(Math.random() * imgSrc.length)
    activeImage[number] = imgSrc[imgNumber].name
    targetImage.src = imgPath + imgSrc[imgNumber].src
}

function endGame() {
    clearInterval(interval)
}