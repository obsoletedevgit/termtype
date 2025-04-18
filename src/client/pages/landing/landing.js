const textEntry = document.getElementById("textEntry");

function preamble(){
    printToTerm("Welcome to termtype!");
    printToTerm("Type 'HELP' for basic tips and tricks");
}

function printToTerm(msg){
    var textToDisplay = document.createElement('pre');
    textToDisplay.textContent = msg;
    textEntry.appendChild(textToDisplay);
}

function readCommandInput(){

}

//commands

preamble();