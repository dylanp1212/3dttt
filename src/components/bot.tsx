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
  function checkGameResult(winners: number[]): number {
    for (const [a, b, c] of lines) {
      if (winners[a] == winners[b] && winners[b] == winners[c] &&
        (winners[a] == 1 || winners[a] == 2)) {
        return winners[a]
      }
    }
    return winners.every((w) => w != 0) ? 3 : 0
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
  const minimax = (depth, board, alpha, beta) => {
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
      const s = minimax(depth, possible, alpha, beta)
      scores.push(s)
      moves.push(avail[i])
      if (player == 2) {
        alpha = Math.max(alpha, s)
      } else {
        beta = Math.min(beta, s)
      }
      if (alpha >= beta) {
        break
      }
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
    minimax(0, boards[targetboard], -Infinity, Infinity)
    makeMove(targetboard, choice, 2)
  }

  // full board minimax
  const getavailablemovesfull = (tboards, tcurrboard, tboardWinners) => {
    const avail = []
    for (let b = 0; b < 9; b++) {
      const bavail = []
      if ((tcurrboard == undefined || tcurrboard == b) && tboardWinners[b] == 0) {
        for (let i = 0; i < 9; i++) {
          if (tboards[b][i] == 0) {
            bavail.push(i)
          }
        }
      }
      let bshuffled = bavail
        .map(val => ({val, sort: Math.random()}))
        .sort((x, y) => x.sort - y.sort)
        .map(({val}) => val)
      avail.push(bshuffled)
    }
    return (avail)
  }
  const getnewstatefull = (tboards, moveboard, movebox, player, tboardWinners) => {
    const newboards = [...tboards]
    newboards[moveboard] = [...tboards[moveboard]]
    newboards[moveboard][movebox] = player
    const newboardWinners = [...tboardWinners]
    newboardWinners[moveboard] = checkResult(newboards[moveboard])
    const newcurrboard = newboardWinners[movebox] != 0 ? undefined : movebox
    return ({newboards, newcurrboard, newboardWinners})
  }
  const scorefull = (depth, tboards, tboardWinners) => {
    const gameres = checkGameResult(tboardWinners)
    if (gameres == 2) {
      return (1000 - depth)
    } else if (gameres == 1) {
      return (depth - 1000)
    } else if (gameres == 3) {
      return (0)
    } else {
      let total = 0
      for (let i = 0; i < 9; i++) {
        if (tboardWinners[i] == 2) {
          if (i == 4) {
            total += 15
          } else if (i == 0 || i == 2 || i == 6 || i == 8) {
            total += 12
          } else {
            total += 10
          }
        } else if (tboardWinners[i] == 1) {
          if (i == 4) {
            total -= 15
          } else if (i == 0 || i == 2 || i == 6 || i == 8) {
            total -= 12
          } else {
            total -= 10
          }
        }
      }
      return (total)
    }
  }
  let choicefull = {board: 0, box: 0}
  const minimaxfull = (depth, tboards, alpha, beta, tboardWinners, tcurrboard, depthlimit) => {
    if (checkGameResult(tboardWinners) != 0 || depth > depthlimit) {
      return scorefull(depth, tboards, tboardWinners)
    }
    const player = turnatdepth(depth)
    depth += 1
    const scores = []
    const moves = []
    const avail = getavailablemovesfull(tboards, tcurrboard, tboardWinners)
    for (let b = 0; b < 9; b++) {
      for (let i = 0; i < avail[b].length; i++) {
        const possible = getnewstatefull(tboards, b, avail[b][i], player, tboardWinners)
        const s = minimaxfull(depth, possible.newboards, alpha, beta, possible.newboardWinners, possible.newcurrboard, depthlimit)
        scores.push(s)
        moves.push({board: b, box: avail[b][i]})
        if (player == 2) {
          alpha = Math.max(alpha, s)
        } else {
          beta = Math.min(beta, s)
        }
        if (alpha >= beta) {
          break
        }
      }
      if (alpha >= beta) {
        break
      }
    }
    if (player == 2) {
      const maxindex = scores.indexOf(Math.max(...scores))
      choicefull = moves[maxindex]
      return (scores[maxindex])
    } else {
      const minindex = scores.indexOf(Math.min(...scores))
      choicefull = moves[minindex]
      return (scores[minindex])
    }
  }
  const hard = () => {
    minimaxfull(0, boards, -Infinity, Infinity, boardWinners, currboard, 4)
    makeMove(choicefull.board, choicefull.box, 2)
  }
  const reallyhard = () => {
    minimaxfull(0, boards, -Infinity, Infinity, boardWinners, currboard, 7)
    makeMove(choicefull.board, choicefull.box, 2)
  }
  const extreme = () => {
    minimaxfull(0, boards, -Infinity, Infinity, boardWinners, currboard, 10)
    makeMove(choicefull.board, choicefull.box, 2)
  }

  useEffect(() => {
    if (turn == 2 && gameWinner == 0) {
      if (botdiff == 0) {
        easy()
      } else if (botdiff == 1) {
        medium()
      } else if (botdiff == 2) {
        hard()
      } else if (botdiff == 3) {
        reallyhard()
      } else {
        extreme()
      }
      setTurn(1)
    }
  }, [turn, gameWinner])
  return (null)
}