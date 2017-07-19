import React from 'react'
import Square from './square.jsx'

export default class Board extends React.Component {
  constructor () {
    super()
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
      prev: []
    }
  }

  squareClick (i) {
    let squares = this.state.squares.slice()
    if (this.state.winner || squares[i]) return
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      winner: this.calcWinner(squares),
      prev: this.state.prev + [i]
    })
  }

  backClick () {
    let prev = this.state.prev.slice()
    let pl = prev.length
    if (pl > 0) {
      let squares = this.state.squares.slice()
      squares[prev[pl-1]] = null
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
        winner: null,
        prev: prev.slice(0, pl-1)
      })
    }
  }

  resetClick () {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null
    })
  }

  calcWinner (q) {
    let lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    let cat = true
    for (let line of lines) {
      let [a, b, c] = line.map(x => q[x])
      if (a && a === b && a === c) return a //checks for winner
      if (!a || !b || !c) cat = false //checks for cat's game
    }
    if (cat) return 'C'
    return null
  }

  renderSquare (i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.squareClick(i)}
      />
    )
  }

  render () {
    let winner = this.state.winner
    let status
    if (winner === 'C') status = "cat's game"
    else if (winner) status = 'winner: ' + winner
    else status = 'next: ' + (this.state.xIsNext ? 'X' : 'O')

    return (
      <div>
        <div>{status}</div>
        <div className="boardrow">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="boardrow">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="boardrow">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className='boardrow'>
          <Square value='<' onClick={() => this.backClick()} />
          <Square value='R' onClick={() => this.resetClick()} />
        </div>
      </div>
    )
  }
}