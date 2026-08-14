import {createContext, useContext, Dispatch, SetStateAction} from 'react'

export const TurnContext = createContext<{turn: 1|2,
  setTurn: Dispatch<SetStateAction<1|2>>,
  currboard: number|undefined,
  setCurrboard: Dispatch<SetStateAction<number|undefined>>,
  grid: number[],
  setGrid: Dispatch<SetStateAction<number[]>>}>({turn: 1, setTurn: () => {},
  currboard: undefined, setCurrboard: () => {},
  grid: [0,0,0,0,0,0,0,0,0], setGrid: () => {}})

export const useTurn = () => useContext(TurnContext)
