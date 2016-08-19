'use strict'

class Config {
  constructor (rules) {
    this.rules = rules
    this.moves = Object.keys(rules)
  }

  isValid (move) {
    return this.moves.indexOf(move) !== -1
  }

  isWinner (move, counter) {
    return this.rules[move] === counter
  }

  isLoser (move, counter) {
    return this.rules[counter] === move
  }

  isDraw (move, counter) {
    return !this.isWinner(move, counter) && !this.isLoser(move, counter)
  }
}

Config.parse =
  (data) => {
    const { rules } = JSON.parse(data)
    return new Config(rules)
  }

module.exports = {
  Config
}
