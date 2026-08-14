import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tttbox from './tttbox'
import {useTurn} from './turnContext'
import {useState, useEffect} from 'react'

export default function Tttboard({winner, setWinner, board, gameWinner}: {winner: number,
  setWinner: (board: number, winner: number) => void, board: number, gameWinner: number}) {
  const {currboard} = useTurn()
  const [grid, setGrid] = useState<number[]>([0,0,0,0,0,0,0,0,0])
  const updateGrid = (box: number, val: 1|2) => {
    const newgrid = [...grid]
    newgrid[box] = val
    setGrid(newgrid)
  }
  useEffect(() => {
    let full = true
    for (let i = 0; i < 9; i++) {
      if (grid[i] == 0) {
        full = false
      }
    }
    if (grid[0] == grid[1] && grid[1] == grid[2] && grid[0] != 0) {
      setWinner(board, grid[0])
    } else if (grid[3] == grid[4] && grid[4] == grid[5] && grid[3] != 0) {
      setWinner(board, grid[3])
    } else if (grid[6] == grid[7] && grid[7] == grid[8] && grid[6] != 0) {
      setWinner(board, grid[6])
    } else if (grid[0] == grid[3] && grid[3] == grid[6] && grid[0] != 0) {
      setWinner(board, grid[0])
    } else if (grid[1] == grid[4] && grid[4] == grid[7] && grid[1] != 0) {
      setWinner(board, grid[1])
    } else if (grid[2] == grid[5] && grid[5] == grid[8] && grid[2] != 0) {
      setWinner(board, grid[2])
    } else if (grid[0] == grid[4] && grid[4] == grid[8] && grid[0] != 0) {
      setWinner(board, grid[0])
    } else if (grid[2] == grid[4] && grid[4] == grid[6] && grid[2] != 0) {
      setWinner(board, grid[2])
    } else if (full) {
      setWinner(board, 3)
    }
  }, [grid])
  return (
    <Box sx={{display: 'grid', border: `3px solid ${winner == 1 ? '#2246f9' : winner == 2 ? '#ff0011' : (currboard == board || currboard == undefined) ? '#6c81e9' : '#646466'}`,
      gridTemplateColumns: 'repeat(3, 50px)'}}>
      {grid.map(
        (val, index) => {
          return(
            <Tttbox boxok={winner == 0 && gameWinner == 0} val={val} updateGrid={updateGrid} box={index} board={board} key={index} />
          )
        }
      )}
    </Box>
  )
}