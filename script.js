var minRoom = 1
var maxRoom = 20

var wumpus = Math.floor(Math.random() * maxRoom + minRoom)
var wumpusBehavior = Math.random() // A behavior < 0.5 means he's friendly. > 0.5 means he'll kill you
var yourRoom = Math.floor((Math.random() * maxRoom) + minRoom)
var gameOver = 0

var victoryStatement = 'You have found the Wumpus and have not been eaten!'
var defeatStatement = 'You have found the Wumpus and have been eaten...'

/**
 * Gets a proper room input from the user, continously prompting them for a room input
 * if they try to input nothing, a wrong room number, a string with no number
 * @param {string} nextRoom
 * @return {int} nextRoom The next room to navigate too.
 */
function getRoomInput (nextRoom) {
  while (nextRoom === null || nextRoom === '') {
    nextRoom = window.prompt('You are in room ' + yourRoom + '. Which room do you want to go to?')
  }
  while (isNaN(parseInt(nextRoom))) {
    nextRoom = window.prompt('You are in room ' + yourRoom + '. Which room do you want to go to?')
  }
  while (nextRoom > maxRoom || nextRoom < minRoom) {
    nextRoom = window.prompt('You are in room ' + yourRoom + '. Which room do you want to go to?')
  }

  nextRoom = nextRoom.trim()
  nextRoom = Math.floor(nextRoom) // If the user inputs a floating point number like 3.2, nextRoom will round that down to 3
  return nextRoom
}

/**
 * Sanitizes the decision the player makes as to kill the Wumpus or not.
 * @param {string} decision
 * @return {int} decision The decision the player made. 1 To not kill the Wumpus, 2 to kill the Wumpus, 3 to kill themselves
 */
function sanitizeDecision (decision) {
  while (decision === null || decision === '') {
    decision = window.prompt('What will you do? Type:\n1 - To NOT kill the Wumpus.\n2 - Kill the Wumpus.\n3 - Kill yourself.')
  }
  while (isNaN(parseInt(decision))) {
    decision = window.prompt('What will you do? Type:\n1 - To NOT kill the Wumpus.\n2 - Kill the Wumpus.\n3 - Kill yourself.')
  }
  while (decision < 1 || decision > 3) {
    decision = window.prompt('What will you do? Type:\n1 - To NOT kill the Wumpus.\n2 - Kill the Wumpus.\n3 - Kill yourself.')
  }

  decision = decision.trim()
  decision = Math.floor(decision)
  return decision
}

/**
 * Determines if we can smell the Wumpus. You can smell the Wumpus up to 2 rooms away
 * @return true If we can smell the Wumpus
 */
function smellWumpus () {
  var distance = yourRoom - wumpus
  if (distance < 0) { // Absolute value the distance
    distance *= -1
  }

  if (distance <= 2) {
    return true
  } else {
    return false
  }
}

window.alert('Welcome to the GAME, punk')
var readyToPlay = window.prompt('Are you ready to play the game?')

while (readyToPlay === null || readyToPlay === '') {
  readyToPlay = window.prompt("I'm sorry, what did you say punk?")
}

readyToPlay = readyToPlay.trim().toLowerCase()

if (readyToPlay !== 'yes') {
  window.alert('Too bad, you\'re in this for real')
} else if (readyToPlay === 'yes') {
  window.alert("Good, let's begin")
}

window.confirm('You are about to embark on a quest for the Wumpus.')
window.confirm('The wumpus is hidden in a room from ' + minRoom + ' to ' + maxRoom + '. You have been randomly dropped in a room between ' + minRoom + ' and ' + maxRoom + '.')
window.confirm('The wumpus moves about randomly. He may be in a room at some time, but then move to another room. You must keep moving to find the Wumpus.')
window.confirm('You can smell the Wumpus up to two rooms away.')
window.confirm('Your goal is find the Wumpus. It may be happy, or it may be ferral. You could live, you could die. Only one way to find out.')

if (yourRoom === wumpus && wumpusBehavior < 0.6) {
  window.alert(victoryStatement)
  gameOver = 1
} else if (yourRoom === wumpus && wumpusBehavior >= 0.6) {
  window.alert(defeatStatement)
  gameOver = 1
} else {
  console.log('Wumpus not found immediately')
}

console.log('Wumpus room: ' + wumpus)
console.log('Your room: ' + yourRoom)

while (!gameOver) {
  var nextRoom
  if (smellWumpus()) {
    nextRoom = window.prompt('You are in room ' + yourRoom + '. You can smell the Wumpus! Which room do you want to go to?')
  }
  else {
    nextRoom = window.prompt('You are in room ' + yourRoom + '. Which room do you want to go to?')
  }
  nextRoom = getRoomInput(nextRoom)

  if (nextRoom === wumpus) { // If you move into the room with the Wumpus
    if (wumpusBehavior < 0.6) { // If the wumpus is happy, you've won!
      window.alert('You have found the Wumpus. Now you\'re thinking, "I could kill this Wumpus..." like the monster you are.')
      var decision = window.prompt('What will you do? Type:\n1 - To NOT kill the Wumpus.\n2 - Kill the Wumpus.\n3 - Kill yourself.')
      decision = sanitizeDecision(decision)
      if (decision === 1) {
        window.alert(victoryStatement)
      } else if (decision === 2) {
        window.alert('You have won... But at what cost?')
      } else if (decision === 3) {
        window.alert('The wumpus is extraordinarily apathetic about your dead body now that you\'ve killed yourself. Good job.')
      }
    } else if (wumpusBehavior >= 0.6) { // If the wumpus is ferral, you've been eaten
      window.alert(defeatStatement)
    }
    gameOver = 1
  } else {
    wumpus = Math.floor(Math.random() * maxRoom + minRoom) // Give the Wumpus a new random room number
    yourRoom = nextRoom
  }

  console.log('Wumpus room: ' + wumpus)
  console.log('Your room: ' + yourRoom)
}

window.alert('GAME OVER')
