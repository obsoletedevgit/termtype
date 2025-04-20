# termtype
Retro feel AI tool

## What is termtype?
Termtype is a small microproject which I worked on to allow me to chat to an AI in a retro looking CRT console

## How do I use termtype
Termtype uses a express server to host a HTML website. You can simpily clone the repo and follow the steps below to get up and running.

## How do I start a new chat
You can use the '!new' command to clear everything from the screen and also request the AI agent clears its memory

## How do I clear the screen
You can use the '!clear' command to clear everything from the screen

# Instructions
how to setup termtype
## Step one
Clone the repo to your local pc
## Step two
Ensure you have node runtime installed and run the command 'NPM i' in your terminal whilst in the project directory
## Step three
Create a file called `.env` and paste the code below into it
```
PORT=
KEY=
```
## Step 4
On the `PORT` line specify the port you want the server to listen for requests on (e.g `3000`)
On the `KEY` line you will need paste in a Gemini API key. For testing I used the `Gemini-2.0-flash model` so I would recommend that
You can get a api key at [Google Gemini API key](https://aistudio.google.com/apikey).

## Step 5
Once you've done all that you should be ready to go! if you type npm start into the console and go to localhost:PORT (PORT being the port you specified in your .env file) you should be able to chat to the AI agent.
