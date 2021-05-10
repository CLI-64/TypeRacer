'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3333';
const socket = io.connect(host);
const chalk = require('chalk')
const Player = require('./src/newplayer.js')

let { sentences, compliments } = require('./src/scripts/listofstrings.js')
let currentSentence;
let winner = [];
let compliment;
const players = {
  // this is where players are listed
}


socket.on('newPlayer', payload => {
  // Creates a new player
  players[payload] = new Player(payload)
})

socket.on('connect', payload => {
  openingImage()
  socket.emit('play', 'TypeRacer Cartridge plugged in! Type \'start\' when you are ready to play!')
  socket.emit('insert cartridge')
})

// After pressing enter
socket.on('play', payload => {
  if (payload.text) {
    if (payload.text.split('\n')[0] === 'play again') {
      currentSentence = sentences[Math.floor(Math.random() * sentences.length)]
      compliment = compliments[Math.floor(Math.random() * compliments.length)]
      Object.keys(players).forEach(player => {
        players[player].score = 0
      })
      startGame(currentSentence);
    }
    if (payload.text.split('\n')[0] === currentSentence) {
      // Stop game and display winner
      // Prevents more than 1 user from winning a round
      winner.push('Someone won')
      if (winner.length === 1) {
        // Reset sentence
        currentSentence = sentences[Math.floor(Math.random() * sentences.length)]
        // Increment score
        players[payload.playerName].score++
        socket.emit('clear', 'x')
        socket.emit('play', `                                  ${compliment}  ${payload.playerName} WINS THE ROUND!!`)
        spacing()
        if (players[payload.playerName].score === 3) {
          socket.emit('clear', 'x')
          socket.emit('play', `                                  ${payload.playerName} WINS!!!`)
          spacing()
          playAgain()
          winner.pop()
        } else {
          // Reset
          winner.pop()
          nextQuestion(currentSentence)
        }
      }
    }
  }
})


socket.on('disconnect', payload => {
  socket.emit('clear', 'x')
})

socket.on('runGame', payload => {
  // Start game with random sentence
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)]
  compliment = compliments[Math.floor(Math.random() * compliments.length)]
  startGame(currentSentence);
})


function startGame(sentence) {
  socket.emit('clear')
  countdown(sentence)
}

function nextQuestion(sentence) {
  countdown(sentence, 'alternate')
}

function playAgain() {
  setTimeout(() => {
    socket.emit('clear')
    socket.emit('play', `                  __________.__                   _____                .__     _________ `)
    socket.emit('play', `                  \\______   \\  |_____  ___.__.   /  _  \\    _________  |__| ___\\_____   \\`)
    socket.emit('play', `                  |     ___/  | \\__  \\<   |  |  /  /_\\  \\  / ___\\__  \\ |  |/    \\ /   __/`)
    socket.emit('play', `                  |    |   |  |__/ __ \\___   | /    |    \\/ /_/  > __ \\|  |   |  \\   |   `)
    socket.emit('play', `                  |____|   |____(____  / ____| \\____|__  /\\___  (____  /__|___|  /___|   `)
    socket.emit('play', `                                     \\/\\/              \\//_____/     \\/        \\/<___> `)
    socket.emit('play', `                                  (Want to play again? Type 'play again')                 `)
    spacing()
  }, 3000)
}

function openingImage() {
  socket.emit('clear', 'x')
  socket.emit('play', '              ___________                   __________                            ')
  socket.emit('play', '               \\__   ___/__.__.______   ____\\______   \\_____    ____  ___________ ')
  socket.emit('play', '                |    | <   |  |\\____ \\_/ __ \\|       _/\\__  \\_/ ___\\/ __ \\_  __ \\')
  socket.emit('play', '                |    |  \\___  ||  |_> >  ___/|    |   \\/ __  \\\  \\__\\  ___/|  | \\/')
  socket.emit('play', '                |____|  / ____||   __/ \___  >____|_  /(____  /\___  >___  > __|   ')
  socket.emit('play', '                        \\/     |__|       \\/       \\/      \\/    \\/    \\/     ')
  socket.emit('play', '                              ,---------------------------,')
  socket.emit('play', '                              |  /---------------------\  |')
  socket.emit('play', '                              | |                       | |')
  socket.emit('play', '                              | |       `o##o>          | |')
  socket.emit('play', '                              | |               `o##o>  | |')
  socket.emit('play', '                              | | `o##o>                | |')
  socket.emit('play', '                              | |          `o##o>       | |')
  socket.emit('play', '                              |  \_____________________/  |')
  socket.emit('play', '                              |___________________________|')
  socket.emit('play', '                              ,---\_____     []     _______/------,')
  socket.emit('play', '                              /         /______________\           /|')
  socket.emit('play', '                              /___________________________________ /  | ___')
  socket.emit('play', '                              |                                   |   |    )')
  socket.emit('play', '                              |  _ _ _                 [-------]  |   |   (')
  socket.emit('play', '                              |  o o o                 [-------]  |  /    _)_')
  socket.emit('play', '                              |__________________________________ |/     /  /')
  socket.emit('play', '                              /-------------------------------------/|      ( )/')
  socket.emit('play', '                              /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ /')
  socket.emit('play', '                              /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ /')
  socket.emit('play', '                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
  socket.emit('play', `                                     `)
  socket.emit('play', `                                     `)
}

function spacing() {
  socket.emit('play', `                                     `)
  socket.emit('play', `                                     `)
  socket.emit('play', `                                     `)
  socket.emit('play', `                                     `)
  socket.emit('play', `                                     `)
  socket.emit('play', `                                     `)
  socket.emit('play', `                                     `)
  socket.emit('play', `                                     `)
  socket.emit('play', `                                     `)
  socket.emit('play', `                                     `)
  socket.emit('play', `                                     `)
  socket.emit('play', `                                     `)
}

function countdown(sentence, alternate) {
  // Next Question Version
  if (alternate) {
    setTimeout(() => {
      socket.emit('clear')
      socket.emit('play', '                                  GET READY FOR THE NEXT ROUND...')
      spacing()
    }, 3000)
    setTimeout(() => {
      socket.emit('clear')
      socket.emit('play', `                                                     `)
      socket.emit('play', `                                                    ${chalk.bgRedBright(`         `)}`)
      socket.emit('play', `                                                    ${chalk.bgRedBright(`         `)}`)
      socket.emit('play', `                                                    ${chalk.bgRedBright(`         `)}`)
      socket.emit('play', `                                                    ${chalk.bgRedBright(`         `)}`)
      spacing()
    }, 5000)
    setTimeout(() => {
      socket.emit('clear')
      socket.emit('play', `                                                    ${chalk.bgYellowBright(`         `)}`)
      socket.emit('play', `                                                    ${chalk.bgYellowBright(`         `)}`)
      socket.emit('play', `                                                    ${chalk.bgYellowBright(`         `)}`)
      socket.emit('play', `                                                    ${chalk.bgYellowBright(`         `)}`)

      spacing()
    }, 6000)
    setTimeout(() => {
      socket.emit('clear')
      socket.emit('play', `                                                    ${chalk.bgGreenBright(`         `)}`)
      socket.emit('play', `                                                    ${chalk.bgGreenBright(`         `)}`)
      socket.emit('play', `                                                    ${chalk.bgGreenBright(`         `)}`)
      socket.emit('play', `                                                    ${chalk.bgGreenBright(`         `)}`)

      spacing()
    }, 7000)
    setTimeout(() => {
      socket.emit('clear')
      socket.emit('clear')
      socket.emit('play', `                              ${sentence}`)
      spacing()
    }, 8000)
  } else { // First Round Version
    setTimeout(() => {
      socket.emit('clear')
      socket.emit('play', `                                                    ${chalk.bgRedBright(`         `)}`)
      socket.emit('play', `                                                    ${chalk.bgRedBright(`         `)}`)
      socket.emit('play', `                                                    ${chalk.bgRedBright(`         `)}`)
      socket.emit('play', `                                                    ${chalk.bgRedBright(`         `)}`)

      spacing()
    }, 1000)
    setTimeout(() => {
      socket.emit('clear')
      socket.emit('play', `                                                    ${chalk.bgYellowBright(`         `)}`)
      socket.emit('play', `                                                    ${chalk.bgYellowBright(`         `)}`)
      socket.emit('play', `                                                    ${chalk.bgYellowBright(`         `)}`)
      socket.emit('play', `                                                    ${chalk.bgYellowBright(`         `)}`)

      spacing()
    }, 2000)
    setTimeout(() => {
      socket.emit('clear')
      socket.emit('play', `                                                    ${chalk.bgGreenBright(`         `)}`)
      socket.emit('play', `                                                    ${chalk.bgGreenBright(`         `)}`)
      socket.emit('play', `                                                    ${chalk.bgGreenBright(`         `)}`)
      socket.emit('play', `                                                    ${chalk.bgGreenBright(`         `)}`)

      spacing()
    }, 3000)
    setTimeout(() => {
      socket.emit('clear')
      socket.emit('play', `                              ${sentence}`)
      spacing()
    }, 4000)

  }

}