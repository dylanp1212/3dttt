import Box from '@mui/material/Box';
import Tttbox from './tttbox'
import {useTurn} from './turnContext'
import {useState} from 'react'

const LINES = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6],
]

function checkResult(grid: number[]): number {
  for (const [a, b, c] of LINES) {
    if (grid[a] == grid[b] && grid[b] == grid[c] && grid[a] != 0) {
      return grid[a]
    }
  }
  return grid.every((cell) => cell != 0) ? 3 : 0
}

export default function Tttboard({winner, setWinner, board, gameWinner}: {winner: number,
  setWinner: (board: number, winner: number) => void, board: number, gameWinner: number}) {
  const {currboard, setCurrboard, grid: metaGrid} = useTurn()
  const [grid, setGrid] = useState<number[]>([0,0,0,0,0,0,0,0,0])
  const updateGrid = (cell: number, val: 1|2) => {
    const newgrid = [...grid]
    newgrid[cell] = val
    setGrid(newgrid)
    const result = checkResult(newgrid)
    if (result != 0) {
      setWinner(board, result)
    }
    const targetFinished = cell == board ? result != 0 : metaGrid[cell] != 0
    setCurrboard(targetFinished ? undefined : cell)
  }
  return (
    <Box sx={{display: 'grid', position: 'relative',
      border: `3px solid ${winner == 1 ? '#2246f9' : winner == 2 ? '#ff0011' : (currboard == board || currboard == undefined) ? '#6c81e9' : '#646466'}`,
      gridTemplateColumns: 'repeat(3, 50px)'}}>
      {grid.map(
        (val, index) => {
          return(
            <Tttbox boxok={winner == 0 && gameWinner == 0} val={val} updateGrid={updateGrid} box={index} board={board} key={index} />
          )
        }
      )}
      {/* 'rgba(100, 100, 102, 0.4)' */}
      {winner == 1 || winner == 2 ? (
        <Box sx={{position: 'absolute', inset: 0, display: 'flex',
          justifyContent: 'center', alignItems: 'center', pointerEvents: 'none',
          backgroundColor: (winner == 1 ? 'rgba(34, 70, 249, 0.4)' : 'rgba(255, 0, 17, 0.4)')}}>
          {winner == 1 ? (
            <Box sx={{width: '120px', height: '120px', position: 'relative',
              '&::before, &::after': {
                content: '""', position: 'absolute', top: '50%', left: 0,
                width: '100%', height: '12px', backgroundColor: '#2246f9',
              },
              '&::before': {transform: 'translateY(-50%) rotate(45deg)'},
              '&::after': {transform: 'translateY(-50%) rotate(-45deg)'},
            }} />
          ) : (
            <Box sx={{width: '120px', height: '120px', boxSizing: 'border-box',
              borderRadius: '50%', border: '12px solid #ff0011'}} />
          )}
        </Box>
      ) : ((currboard != board && currboard != undefined) || winner == 3) ?
        <Box sx={{position: 'absolute', inset: 0, display: 'flex',
          justifyContent: 'center', alignItems: 'center', pointerEvents: 'none',
          backgroundColor: 'rgba(100, 100, 102, 0.4)'}}>
        </Box> : null
      }
    </Box>
  )
}