# Midterms

## Project: CLI-64

### Author: Ryan Tipper, Jenner Dulce, Davion Gracia, Dawit Ayana, Kale Lesko

### Links and Resources

- [ci/cd](http://xyz.com) (GitHub Actions)

### Setup

#### `.env` requirements

- `socket.io-client`
- `chalk`

#### How to initialize/run your application

- `npm game`

#### How to use your library (where applicable)

- `Three seperate repositorys to create a console type experience`

##### Console Repo

- Ensure that all node packages are installed
- Create a `.env` file to store the mongoose database you want to use and port number
- type `npm start` in the console to 'power' the console

##### player.js

- Be sure to verify that the host variable correlates to the URL that is being connected to the socket
  - `http://localhost:3###/` if local
  - `http://##########.ngrok.io` if not local
- type `node player.js` to sign a player in and 'plug in' a controller

##### Hangman / TypeRacer/ Game Repo

- Ensure that all node packages are installed
- Be sure to verify that the host variable correlates to the URL that is being connected to the socket
  - `http://localhost:3###/` if local
  - `http://##########.ngrok.io` if not local
- type `node game` to 'insert' a cartridge

#### Tests

<!-- - How do you run tests?

- Any tests of note?

- Describe any tests that you did not complete, skipped? -->


#### UML

![UML White Board](./assets/--------)
