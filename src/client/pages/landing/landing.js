const textEntry = document.getElementById("textEntry");
const commandInput = document.getElementById("commandInput");
var mode = "C"; //C = command, A = AI, T = TEXT, H = HELP
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
        printToTerm();
        cmdHelp(input);
		return;
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

function cmdHelp(cmd){
	mode = "H";
    if (cmd == "help"){
        printToTerm(`Welcome to  
████████╗███████╗██████╗ ███╗   ███╗████████╗██╗   ██╗██████╗ ███████╗
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝
   ██║   █████╗  ██████╔╝██╔████╔██║   ██║    ╚████╔╝ ██████╔╝█████╗  
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║   ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║   ██║      ██║   ██║     ███████╗
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝   ╚═╝      ╚═╝   ╚═╝     ╚══════╝`);
        printToTerm("You have entered the 'help' command");
        printToTerm("This command can be used to learn how other commands and this website works!");
        printToTerm("List of commands:");
        printToTerm("help    clear   ai    editor    settings    credits");
		printToTerm("Type 'quit' to exit help process");
		printToTerm("Please enter the command you want to learn more about:");
    }
}

function parseHelpCommand(){
	var input = removePrefix(commandInput.value).toLowerCase();
	
	if (input == "help"){
		printToTerm("HELP> The help command can be used to learn more about the commands on this website");
		printToTerm("HELP> The help command sub-process can be quit using the 'quit' command");
		return;
	} else if (input == "quit") {
		printToTerm("HELP> Bye!");
		mode = "C";
		return;
	} else if (input == "clear"){
		printToTerm("HELP> The clear command can be used to remove all text from the screen whilst in 'command' mode");
	} else if (input == "ai") {
		printToTerm("HELP> The ai command can be used to start the ai sub-process");
		printToTerm("HELP> The ai sub-process allows a user to start a chat with the gemini 1.5 flash model");
		printToTerm("HELP> All ai commands have to be prefixed with ! (e.g !quit)");
		printToTerm("HELP> ai commands:");
		printToTerm("HELP> msg    new    quit");
	} else if (input == "editor") {
		printToTerm("HELP> The editor command can be used to start the text editor sub-process");
		printToTerm("HELP> The editor command allows the user to create and edit .txt and .md files");
		printToTerm("HELP> To enable commands in the editor mode you need to press ALT+SHIFT+E");
		printToTerm("HELP> Editor commands:");
		printToTerm("HELP> save    load    quit");
	}
}

//other

loadSavedDefaults();
preamble();

commandInput.onkeydown = function(e){
    if(e.key === "Enter" && mode === "C"){
        readCommandInput(commandInput.innerText);
        commandInput.value = prefix;
        window.scrollTo(0, document.body.scrollHeight);
    } else if (e.key === "Enter" && mode === "H"){
		parseHelpCommand(commandInput.innerText);
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