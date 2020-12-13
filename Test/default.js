"use strict";

function randomPositionValue() {
    return Math.floor(Math.random() *500) +1;
}

function randomSizeValue() {
    return Math.floor(Math.random()*40) + 5;
}

function win(value) {
    if (value >= 10){
        window.location.replace("./WinPage.html")
        // Es wird die Siegesbedingung geprüft und bei Erfolg die neue Seite aufgerufen
    }
}

function setNewButtonPosition(){
    let valueX = randomPositionValue()
    let valueY = randomPositionValue()
    // Es werden mit Hilfe der Funkrion neue Werte für die Position bestimmt

    let valueSize = randomSizeValue()
    // Es wird mit Hilfe der Funkrion ein neuer Wert für die Größe bestimmt

    let element = document.getElementById('imgTarget');
    element.style.left =valueX + 'px';
    element.style.top  = valueY + 'px';
    element.style.height = valueSize + '%';
    // Die oben bestimmten Werte werden eingesetzt
}

function handleTargetClick() {
    const headerTargetHits = document.getElementById('headerHits');
    setNewButtonPosition(headerTargetHits);
    headerTargetHits.innerText++;
    // Der Trefferzähler wird um 1 erhöht
    win(headerTargetHits.innerText);
    // Die Funktion zu Überprüfung zum Gewinnen wird aufgerufen
    setTimeout(()=> handleTargetClick(),250)
}

// function handleStartGame() {
//     const headerTargetHits = document.getElementById('headerHits');
//
//     setNewButtonPosition(headerTargetHits);
//
//
// }