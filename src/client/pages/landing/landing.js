const textEntry = document.getElementById("textEntry");
const commandInput = document.getElementById("commandInput");
const busyText = document.getElementById("busyText");
var prefix = "user@termtype:~$ ";
const version = '1.0.0';

function preamble(){
    printToTerm(`Welcome to   
████████╗███████╗██████╗ ███╗   ███╗████████╗██╗   ██╗██████╗ ███████╗
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝
   ██║   █████╗  ██████╔╝██╔████╔██║   ██║    ╚████╔╝ ██████╔╝█████╗  
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║   ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║   ██║      ██║   ██║     ███████╗
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝   ╚═╝      ╚═╝   ╚═╝     ╚══════╝`)
    printToTerm("Type '!help' for basic tips and tricks");
    printToTerm("Type '!credits' to read the credits");
    printToTerm("Type '!clear' to remove this message")
}

function printToTerm(msg, reply){
    var textToDisplay = document.createElement('pre');
    textToDisplay.textContent = msg;
    textEntry.appendChild(textToDisplay);

    if (reply){
        textToDisplay.style.textAlign = 'right';
    }
}

function readCommandInput(){
    var input = removePrefix(commandInput.value).toLowerCase();

    if (input == "!clear"){
        textEntry.innerHTML = "";
        return;
    } else if (input == "!help"){
        printToTerm(commandInput.value);
        printToTerm("HELP> Welcome to TERMTYPE! Heres a guide on how things work.");
        printToTerm("HELP> How do commands work?")
        printToTerm("HELP> All commands start with a prefix, the prefix is '!'");
        printToTerm("HELP> List of commands:");
        printToTerm("HELP> clear    settings    new");
        printToTerm("HELP> To learn more about chats type '!help chats'");
        printToTerm("HELP> To learn more about keybinds type '!help keybinds'")
    } else if (input == "!new") {
		fetch('/sendmessagetoai', {  
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({"message" : "clear all memory of this chat please."})
		}).then(response => {
			return response.json();
		}) .then(data => {
			data = JSON.parse(data);
            printToTerm("SYSTEM> Chat cleared!");
			commandInput.style.display = "flex";
			commandInput.disabled = false;
		});
    } else {
        printToTerm(commandInput.value);
		commandInput.style.display = "none";
        busyText.style.display = "flex";
		commandInput.disabled = true;
        window.scrollTo(0, document.body.scrollHeight);

        fetch('/sendmessagetoai', {  
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({"message" : input})
		}).then(response => {
			return response.json();
		}) .then(data => {
			data = JSON.parse(data);
            busyText.style.display = "none";
			printToTerm("AI> " + data.reply, true);
			commandInput.style.display = "flex";
			commandInput.disabled = false;
            window.scrollTo(0, document.body.scrollHeight);
		});
    }
}

function removePrefix(inputString) {
    if (inputString.startsWith(prefix)) {
      return inputString.slice(prefix.length);
    }
    return inputString;
}

//commands

//other

preamble();

commandInput.onkeydown = function(e){
    if(e.key === "Enter"){
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