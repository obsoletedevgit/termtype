const textEntry = document.getElementById("textEntry");
const commandInput = document.getElementById("commandInput");
var mode = "C"; //C = command, A = AI, T = TEXT
var prefix = "user@termtype:~$ ";

function loadSavedDefaults(){
    
}

function preamble(){
    printToTerm(`Welcome to   
████████╗███████╗██████╗ ███╗   ███╗████████╗██╗   ██╗██████╗ ███████╗
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝
   ██║   █████╗  ██████╔╝██╔████╔██║   ██║    ╚████╔╝ ██████╔╝█████╗  
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║   ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║   ██║      ██║   ██║     ███████╗
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝   ╚═╝      ╚═╝   ╚═╝     ╚══════╝`)
    printToTerm("Type 'help' for basic tips and tricks");
}

function printToTerm(msg){
    var textToDisplay = document.createElement('pre');
    textToDisplay.textContent = msg;
    textEntry.appendChild(textToDisplay);
}

function readCommandInput(){
    var input = removePrefix(commandInput.value).toLowerCase();

    if (input == "help"){
    } else if (input == "clear"){
        textEntry.innerHTML = "";
    }
}

function removePrefix(inputString) {
    if (inputString.startsWith(prefix)) {
      return inputString.slice(prefix.length);
    }
    return inputString;
}

//commands

loadSavedDefaults();
preamble();

commandInput.onkeydown = function(e){
    if(e.key === "Enter" && mode === "C"){
        readCommandInput(commandInput.innerText);
        commandInput.value = prefix;
    }
};

commandInput.addEventListener('input', () => {
    if (!commandInput.value.startsWith(prefix)) {
      const userInput = commandInput.value.slice(prefix.length);
      commandInput.value = prefix + userInput.replace(prefix, '');
    }
  });

  // Prevent deleting or moving cursor into the prefix
  commandInput.addEventListener('keydown', (e) => {
    const cursorPos = commandInput.selectionStart;

    // Block backspace/delete before the prefix
    if ((e.key === 'Backspace' || e.key === 'Delete') && cursorPos <= prefix.length) {
      e.preventDefault();
    }

    // Block arrow keys from moving before the prefix
    if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && cursorPos <= prefix.length) {
      e.preventDefault();
    }
  });

  // Force cursor after prefix on focus
  commandInput.addEventListener('focus', () => {
    if (commandInput.selectionStart < prefix.length) {
        commandInput.setSelectionRange(prefix.length, prefix.length);
    }
  });

  // Reset cursor if clicked before prefix
  commandInput.addEventListener('click', () => {
    if (commandInput.selectionStart < prefix.length) {
        commandInput.setSelectionRange(prefix.length, prefix.length);
    }
  });