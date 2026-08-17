import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Tttboard from './tttboard'
import Bot from './bot'
import {TurnContext} from './turnContext'
import {useState} from 'react'

const LINES = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6],
]

// same 2 functions? replace with 1?
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
  const [showResult, setShowResult] = useState(false)
  const [showbotdiff, setShowbotdiff] = useState<boolean>(mode == 1)
  const [botdiff, setBotdiff] = useState<number>(0)
  const diffselect = (diff) => {
    setShowbotdiff(false)
    setBotdiff(diff)
  }
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
      const gameResult = checkGameResult(newWinners)
      setGameWinner(gameResult)
      if (gameResult != 0) {
        setShowResult(true)
      }
    }

    const targetFinished = cell == board ? result != 0 : boardWinners[cell] != 0
    setCurrboard(targetFinished ? undefined : cell)
  }
  const handleRestart = () => {
    setTurn(1)
    setBoards(Array.from({length: 9}, () => [0,0,0,0,0,0,0,0,0]))
    setBoardWinners([0,0,0,0,0,0,0,0,0])
    setGameWinner(0)
    setCurrboard(undefined)
    setShowResult(false)
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
        boards, boardWinners, gameWinner, botdiff, makeMove}}>
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
      {gameWinner != 0 ? <Box onClick={handleRestart}
        sx={{display: 'flex', border: '1px solid #6c81e9',
        borderRadius: '10px', p: '10px', cursor: 'pointer', mt: '30px',
        '&:hover': {bgcolor: '#6c81e9'},
        '&:hover .MuiTypography-root': {color: '#15151b'}}}>
        <Typography variant="h6" sx={{fontWeight: 600,
          color: '#6c81e9'}}>
          Restart Game
        </Typography>
      </Box>: null}
      <Dialog open={showResult} onClose={() => setShowResult(false)}
        slotProps={{paper: {sx: {bgcolor: '#15151b', border: '2px solid #6c81e9',
          borderRadius: '10px'}}}}>
        <DialogContent sx={{display: 'flex', flexDirection: 'column',
          alignItems: 'center', p: '30px'}}>
          <Typography variant="h4" sx={{fontWeight: 600,
            color: gameWinner == 1 ? '#2246f9' : gameWinner == 2 ? '#ff0011' : '#6c81e9'}}>
            {gameWinner == 1 ? 'Player 1 Wins!'
              : gameWinner == 2 ? (mode == 2 ? 'Player 2 Wins!' : 'Computer Wins!')
              : 'Draw'}
          </Typography>
          <Box onClick={() => setShowResult(false)}
            sx={{display: 'flex', border: '1px solid #6c81e9',
            borderRadius: '10px', p: '10px', cursor: 'pointer', mt: '20px',
            '&:hover': {bgcolor: '#6c81e9'},
            '&:hover .MuiTypography-root': {color: '#15151b'}}}>
            <Typography variant="h6" sx={{fontWeight: 600,
              color: '#6c81e9'}}>
              Admire Board
            </Typography>
          </Box>
          <Box onClick={handleRestart}
            sx={{display: 'flex', border: '1px solid #6c81e9',
            borderRadius: '10px', p: '10px', cursor: 'pointer', mt: '20px',
            '&:hover': {bgcolor: '#6c81e9'},
            '&:hover .MuiTypography-root': {color: '#15151b'}}}>
            <Typography variant="h6" sx={{fontWeight: 600,
              color: '#6c81e9'}}>
              Restart Game
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={showbotdiff} onClose={() => setShowbotdiff(false)}
        slotProps={{paper: {sx: {bgcolor: '#15151b', border: '2px solid #6c81e9',
          borderRadius: '10px'}}}}>
        <DialogContent sx={{display: 'flex', flexDirection: 'column',
          alignItems: 'center', p: '30px', width: '250px'}}>
          <Typography variant="h4" sx={{fontWeight: 600, color: '#6c81e9'}}>
            Difficulty
          </Typography>
          <Box onClick={() => diffselect(0)}
            sx={{display: 'flex', border: '1px solid #6c81e9', width: '150px',
            borderRadius: '10px', p: '10px', cursor: 'pointer', mt: '20px',
            justifyContent: 'center',
            '&:hover': {bgcolor: '#6c81e9'},
            '&:hover .MuiTypography-root': {color: '#15151b'}}}>
            <Typography variant="h6" sx={{fontWeight: 600, color: '#6c81e9'}}>
              Easy
            </Typography>
          </Box>
          <Box onClick={() => diffselect(1)}
            sx={{display: 'flex', border: '1px solid #6c81e9', width: '150px',
            borderRadius: '10px', p: '10px', cursor: 'pointer', mt: '20px',
            justifyContent: 'center',
            '&:hover': {bgcolor: '#6c81e9'},
            '&:hover .MuiTypography-root': {color: '#15151b'}}}>
            <Typography variant="h6" sx={{fontWeight: 600, color: '#6c81e9'}}>
              Medium
            </Typography>
          </Box>
          <Box onClick={() => diffselect(2)}
            sx={{display: 'flex', border: '1px solid #6c81e9', width: '150px',
            borderRadius: '10px', p: '10px', cursor: 'pointer', mt: '20px',
            justifyContent: 'center',
            '&:hover': {bgcolor: '#6c81e9'},
            '&:hover .MuiTypography-root': {color: '#15151b'}}}>
            <Typography variant="h6" sx={{fontWeight: 600, color: '#6c81e9'}}>
              Hard
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}
