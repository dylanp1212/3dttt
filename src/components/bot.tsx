import {useEffect} from 'react'
import {useTurn} from './turnContext'

export default function Bot() {
  const {currboard, boards, turn, setTurn, makeMove, gameWinner, boardWinners, botdiff} = useTurn()
  // random
  const easy = () => {
    let targetboard = currboard
    if (targetboard == null) {
      targetboard = Math.floor(Math.random() * 9)
      while (boardWinners[targetboard] != 0) {
        targetboard = Math.floor(Math.random() * 9)
      }
    }
    let targetbox = Math.floor(Math.random() * 9)
    while (boards[targetboard][targetbox] != 0) {
      targetbox = Math.floor(Math.random() * 9)
    }
    makeMove(targetboard, targetbox, 2)
  }

  // minimax
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6],
  ]
  function checkResult(grid: number[]): number {
    for (const [a, b, c] of lines) {
      if (grid[a] == grid[b] && grid[b] == grid[c] && grid[a] != 0) {
        return grid[a]
      }
    }
    return grid.every((cell) => cell != 0) ? 3 : 0
  }
  const turnatdepth = (depth) => depth % 2 == 0 ? 2 : 1
  const getavailablemoves = (board) => {
    const avail = []
    for (let i = 0; i < 9; i++) {
      if (board[i] == 0) {
        avail.push(i)
      }
    }
    let shuffled = avail
      .map(val => ({val, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)
      .map(({val}) => val)
    return (shuffled)
  }
  const getnewstate = (board, move, player) => {
    const newboard = [...board]
    newboard[move] = player
    return (newboard)
  }
  let choice = 0
  const score = (depth, board) => {
    if (checkResult(board) == 2) {
      return (10 - depth)
    } else if (checkResult(board) == 1) {
      return (depth - 10)
    } else {
      return 0
    }
  }
  const minimax = (depth, board) => {
    if (checkResult(board) != 0) {
      return score(depth, board)
    }
    const player = turnatdepth(depth)
    depth += 1
    const scores = []
    const moves = []
    const avail = getavailablemoves(board)
    for (let i = 0; i < avail.length; i++) {
      const possible = getnewstate(board, avail[i], player)
      scores.push(minimax(depth, possible))
      moves.push(avail[i])
    }
    if (player == 2) {
      const maxindex = scores.indexOf(Math.max(...scores))
      choice = moves[maxindex]
      return (scores[maxindex])
    } else {
      const minindex = scores.indexOf(Math.min(...scores))
      choice = moves[minindex]
      return (scores[minindex])
    }
  }
  const medium = () => {
    let targetboard = currboard
    if (targetboard == null) {
      targetboard = Math.floor(Math.random() * 9)
      while (boardWinners[targetboard] != 0) {
        targetboard = Math.floor(Math.random() * 9)
      }
    }
    minimax(0, boards[targetboard])
    makeMove(targetboard, choice, 2)
  }
  useEffect(() => {
    if (turn == 2 && gameWinner == 0) {
      if (botdiff == 0) {
        easy()
      } else if (botdiff == 1) {
        medium()
      } else {
        easy()
      }
      setTurn(1)
    }
  }, [turn, gameWinner])
  return (null)
}