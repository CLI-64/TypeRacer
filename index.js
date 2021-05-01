const io = require('socket.io-client')
const { join } = require('path')
const host = 'http://localhost:3000'
 // connects to socket
const socket = io.connect(host)

console.log('TYPERACER UP AND RUNNING...')
socket.emit('enterType','typeracer')
socket.on('hello', joinedRoom)

// typeracerSocket.emit('play', )
// typeracerSocket.on('play', )

function joinedRoom(payload){
  console.log(payload)
}