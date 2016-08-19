'use strict'

const { sample } = require('lodash')
const { readFile } = require('fs')
const { resolve } = require('path')
const vorpal = require('vorpal')

const { Config } = require('./Config')

const cli =
  vorpal()

cli
  .command('play <move>')
  .action(function (args, callback) {
    readFile(resolve(__dirname, 'config.json'), (err, data) => {
      if (err) {
        this.log('Failed to read config file, try again later!')
        this.log(err)
        callback()
      } else {
        const config = Config.parse(data.toString())
        const { move } = args
        if (!config.isValid(move)) {
          this.log(`${move} is not a valid move. Valid moves: `)
          this.log(config.moves)
        } else {
          this.log(`You played ${move}`)
          const counter = sample(config.moves)
          this.log(`Your opponent played ${counter}`)
          if (config.isWinner(move, counter)) {
            this.log('You win! :D')
          } else if (config.isLoser(move, counter)) {
            this.log('You lose. :(')
          } else if (config.isDraw(move, counter)) {
            this.log('It\'s a draw :/')
          } else {
            this.log('Woah, the rules don\'t make sense for that! O_o')
          }
        }
        callback()
      }
    })
  })

cli
  .delimiter('rps>')

module.exports = {
  cli
}
