import {useEffect} from 'react'
import {useTurn} from './turnContext'

export default function Bot() {
  const {currboard, boards, turn, setTurn, makeMove, gameWinner, boardWinners} = useTurn()
  useEffect(() => {
    if (turn == 2 && gameWinner == 0) {
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
      setTurn(1)
    }
  }, [turn, gameWinner])
  return (null)
}