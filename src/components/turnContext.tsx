import {createContext, useContext, Dispatch, SetStateAction} from 'react'

export const TurnContext = createContext<{turn: 1|2,
  setTurn: Dispatch<SetStateAction<1|2>>,
  currboard: number|undefined,
  setCurrboard: Dispatch<SetStateAction<number|undefined>>,
  boards: number[][],
  boardWinners: number[],
  gameWinner: number,
  makeMove: (board: number, cell: number, val: 1|2) => void}>({turn: 1, setTurn: () => {},
  currboard: undefined, setCurrboard: () => {},
  boards: Array.from({length: 9}, () => [0,0,0,0,0,0,0,0,0]),
  boardWinners: [0,0,0,0,0,0,0,0,0],
  gameWinner: 0,
  makeMove: () => {}})

export const useTurn = () => useContext(TurnContext)
