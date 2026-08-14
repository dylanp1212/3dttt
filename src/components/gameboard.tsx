import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tttboard from './tttboard'
import {TurnContext} from './turnContext'
import {useState, useEffect} from 'react'

export default function Gameboard() {
  const [turn, setTurn] = useState<1|2>(1)
  const [grid, setGrid] = useState<number[]>([0,0,0,0,0,0,0,0,0])
  const [gameWinner, setGameWinner] = useState<number>(0)
  const updateGrid = (board: number, winner: number) => {
    const newgrid = [...grid]
    newgrid[board] = winner
    setGrid(newgrid)
  }
  useEffect(() => {
    let full = true
    for (let i = 0; i < 9; i++) {
      if (grid[i] == 0) {
        full = false
      }
    }
    if (grid[0] == grid[1] && grid[1] == grid[2] && (grid[0] == 1 || grid[0] == 2)) {
      setGameWinner(grid[0])
    } else if (grid[3] == grid[4] && grid[4] == grid[5] && (grid[3] == 1 || grid[3] == 2)) {
      setGameWinner(grid[3])
    } else if (grid[6] == grid[7] && grid[7] == grid[8] && (grid[6] == 1 || grid[6] == 2)) {
      setGameWinner(grid[6])
    } else if (grid[0] == grid[3] && grid[3] == grid[6] && (grid[0] == 1 || grid[0] == 2)) {
      setGameWinner(grid[0])
    } else if (grid[1] == grid[4] && grid[4] == grid[7] && (grid[1] == 1 || grid[1] == 2)) {
      setGameWinner(grid[1])
    } else if (grid[2] == grid[5] && grid[5] == grid[8] && (grid[2] == 1 || grid[2] == 2)) {
      setGameWinner(grid[2])
    } else if (grid[0] == grid[4] && grid[4] == grid[8] && (grid[0] == 1 || grid[0] == 2)) {
      setGameWinner(grid[0])
    } else if (grid[2] == grid[4] && grid[4] == grid[6] && (grid[2] == 1 || grid[2] == 2)) {
      setGameWinner(grid[2])
    } else if (full) {
      setGameWinner(3)
    }
  }, [grid])
  return (
    <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Box sx={{display: 'flex', justifyContent: 'center', mt: '10px'}}>
        <Box sx={{display: 'flex', justifyContent: 'center',
          mr: '50px', p: '10px', borderRadius: '10px',
          border: `${turn == 1 ? '3' : '1'}px solid #2246f9`}}>
          <Typography variant="h5" sx={{fontWeight: 600, color: '#2246f9'}}>
            Player 1
          </Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center',
          ml: '50px', p: '10px', borderRadius: '10px',
          border: `${turn == 2 ? '3' : '1'}px solid #ff0011`}}>
          <Typography variant="h5" sx={{fontWeight: 600, color: '#ff0011'}}>
            Player 2
          </Typography>
        </Box>
      </Box>
      <TurnContext.Provider value={{turn, setTurn}}>
        <Box sx={{mt: '30px', display: 'grid', gridTemplateColumns: 'repeat(3, 158px)',
          border: `3px solid ${gameWinner == 1 ? '#2246f9' : gameWinner == 2 ? '#ff0011' : '#646466'}`}}>
          {grid.map(
            (val, index) => {
              return(
                <Tttboard winner={val} setWinner={updateGrid} board={index}
                  gameWinner={gameWinner} key={index} />
              )
            }
          )}
        </Box>
      </TurnContext.Provider>
    </Box>
  )
}