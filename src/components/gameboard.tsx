import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tttboard from './tttboard'
import Bot from './bot'
import {TurnContext} from './turnContext'
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

function checkGameResult(winners: number[]): number {
  for (const [a, b, c] of LINES) {
    if (winners[a] == winners[b] && winners[b] == winners[c] &&
      (winners[a] == 1 || winners[a] == 2)) {
      return winners[a]
    }
  }
  return winners.every((w) => w != 0) ? 3 : 0
}

export default function Gameboard({mode}: {mode: 1|2}) {
  const [turn, setTurn] = useState<1|2>(1)
  const [boards, setBoards] = useState<number[][]>(
    Array.from({length: 9}, () => [0,0,0,0,0,0,0,0,0]))
  const [boardWinners, setBoardWinners] = useState<number[]>([0,0,0,0,0,0,0,0,0])
  const [gameWinner, setGameWinner] = useState<number>(0)
  const [currboard, setCurrboard] = useState<number|undefined>(undefined)
  const makeMove = (board: number, cell: number, val: 1|2) => {
    const newBoardGrid = [...boards[board]]
    newBoardGrid[cell] = val
    const newBoards = [...boards]
    newBoards[board] = newBoardGrid
    setBoards(newBoards)

    const result = checkResult(newBoardGrid)
    if (result != 0) {
      const newWinners = [...boardWinners]
      newWinners[board] = result
      setBoardWinners(newWinners)
      setGameWinner(checkGameResult(newWinners))
    }

    const targetFinished = cell == board ? result != 0 : boardWinners[cell] != 0
    setCurrboard(targetFinished ? undefined : cell)
  }
  return (
    <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Box sx={{display: 'flex', justifyContent: 'center', mt: '10px'}}>
        <Box sx={{display: 'flex', justifyContent: 'center',
          mr: '50px', p: '10px', borderRadius: '10px', border: `2px solid #2246f9`,
          bgcolor: `#${turn == 1 ? '2246f9' : '15151b'}`}}>
          <Typography variant="h5" sx={{fontWeight: 600, color: `#${turn == 1 ? '15151b' : '2246f9'}`}}>
            Player 1
          </Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center',
          ml: '50px', p: '10px', borderRadius: '10px', border: `2px solid #ff0011`,
          bgcolor: `#${turn == 2 ? 'ff0011' : '15151b'}`}}>
          <Typography variant="h5" sx={{fontWeight: 600, color: `#${turn == 2 ? '15151b' : 'ff0011'}`}}>
            {mode == 2 ? 'Player 2' : 'Computer'}
          </Typography>
        </Box>
      </Box>
      <TurnContext.Provider value={{turn, setTurn, currboard, setCurrboard,
        boards, boardWinners, gameWinner, makeMove}}>
        <Box sx={{mt: '30px', display: 'grid', gridTemplateColumns: 'repeat(3, 158px)',
          border: `3px solid ${gameWinner == 1 ? '#2246f9' : gameWinner == 2 ? '#ff0011' : '#646466'}`}}>
          {boardWinners.map(
            (_, index) => {
              return(
                <Tttboard board={index} key={index} />
              )
            }
          )}
        </Box>
        {mode == 1 ? <Bot /> : null}
      </TurnContext.Provider>
    </Box>
  )
}
