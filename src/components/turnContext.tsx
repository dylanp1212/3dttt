import {createContext, useContext, Dispatch, SetStateAction} from 'react'

export const TurnContext = createContext<{turn: 1|2,
  setTurn: Dispatch<SetStateAction<1|2>>}>({turn: 1, setTurn: () => {}})

export const useTurn = () => useContext(TurnContext)
