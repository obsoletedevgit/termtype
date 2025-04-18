const textEntry = document.getElementById("textEntry");
const commandInput = document.getElementById("commandInput");
var mode = "C"; //C = command, A = AI, T = TEXT
var prefix = "user@termtype:~$ ";
const version = '1.0.0'

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
        printToTerm(commandInput.value);
        cmdHelp();
    } else if (input == "clear"){
        textEntry.innerHTML = "";
        return;
    }
}

function removePrefix(inputString) {
    if (inputString.startsWith(prefix)) {
      return inputString.slice(prefix.length);
    }
    return inputString;
}

//commands

function cmdHelp(){
    printToTerm(`Welcome to  
████████╗███████╗██████╗ ███╗   ███╗████████╗██╗   ██╗██████╗ ███████╗
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝
   ██║   █████╗  ██████╔╝██╔████╔██║   ██║    ╚████╔╝ ██████╔╝█████╗  
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║   ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║   ██║      ██║   ██║     ███████╗
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝   ╚═╝      ╚═╝   ╚═╝     ╚══════╝`)
   printToTerm(`
You have entered the 'help' command
This command can be used to learn how other commands and this website works!

Usage: help [command you want help with]

List of commands:
help    clear   ai  editor  settings    credits
`);
}

//other

loadSavedDefaults();
preamble();

commandInput.onkeydown = function(e){
    if(e.key === "Enter" && mode === "C"){
        readCommandInput(commandInput.innerText);
        commandInput.value = prefix;
        window.scrollTo(0, document.body.scrollHeight);
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