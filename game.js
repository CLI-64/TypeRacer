'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3333';
const socket = io.connect(host);
let currentSentence;
let winner = [];

const sentences = [
  `Tom threw Tim three thumbtacks`,
  `He threw three free throws`,
  `So, this is the sushi chef`,
  `Eddie edited it`,
  `I saw a kitten eating chicken in the kitchen`,
  `Can you can a can as a canner can can a can?`,
  `You know New York, you need New York, you know you need unique New York`,
  `I saw a kitten eating chicken in the kitchen`,
  `If a dog chews shoes, whose shoes does he choose?`,
  `I thought I thought of thinking of thanking you`,
  `I wish to wash my Irish wristwatch`,
  `Fred fed Ted bread, and Ted fed Fred bread`,
  `I fitted the sheet, the sheet I sheets, and on the fitted sheet I sit`,
  `A skunk sat on a stump and thunk the stump stunk, but the stump thunk the skunk stunk`,
  `Lesser leather never weathered wetter weather better`,
]
const Player = require('./newplayer.js')
const players = {
  // this is where players are listed
}

socket.on('joined', payload => {
  // creates a new player
  players[payload] = new Player(payload)
})

socket.on('connect', payload => {
  console.log('Cartridge plugged in!')
})

// after pressing enter
socket.on('play', payload => {
  // check player current players
  if (payload.text) {
    if (payload.text.split('\n')[0] === 'data') {
      console.log(players)
    }
    // If the players entry matches the current sentence
    if (payload.text.split('\n')[0] === players[payload.playerName].sentence) {
      // stop game and display winner
      winner.push('Someone won')
      if (winner.length === 1) {
        // reset sentence
        currentSentence = sentences[Math.floor(Math.random() * sentences.length)]
        Object.keys(players).forEach(value => {
          players[value].sentence = currentSentence;
        })
        // increment score
        players[payload.playerName].score++
        socket.emit('play', `${payload.playerName} WON THE ROUND!!!`)
        if (players[payload.playerName].score === 3) {
          socket.emit('play', `${payload.playerName} WINS!!`)
          winner.pop()
        } else {
          // reset
          winner.pop()
          // Might have to pass in the socket...
          nextQuestion(currentSentence)
        }
      }
    }
  }
})

socket.on('runGame', payload => {
  // start game with random sentence
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)]
  console.log(`Within runGame event: currentSentence = ${currentSentence}`)
  Object.keys(players).forEach(value => {
    players[value].sentence = currentSentence;
  })
  startGame(currentSentence);
})

// new player joins game
function startGame(sentence) {
  socket.emit('clear')
  setTimeout(() => {
    socket.emit('play', '3')
  }, 1000)
  setTimeout(() => {
    socket.emit('play', '2')
  }, 2000)
  setTimeout(() => {
    socket.emit('play', '1')
  }, 3000)
  setTimeout(() => {
    socket.emit('play', '===========================')
    socket.emit('play', `${sentence}`)
    socket.emit('play', '===========================')
  }, 4000)

}

function nextQuestion(sentence) {
  setTimeout(() => {
    socket.emit('clear')
  }, 3000)
  socket.emit('play', '===========================')
  socket.emit('play', 'GET READY FOR THE NEXT ROUND...')
  socket.emit('play', '===========================')
  setTimeout(() => {
    socket.emit('play', '3')
  }, 4000)
  setTimeout(() => {

    socket.emit('play', '2')
  }, 5000)
  setTimeout(() => {
    socket.emit('play', '1')
  }, 6000)
  setTimeout(() => {
    socket.emit('play', '===========================')
    socket.emit('play', sentence)
    socket.emit('play', '===========================')
  }, 7000)
}