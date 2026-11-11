import Box from '@mui/material/Box';
import {useTurn} from './turnContext'

export default function Tttbox({board, box}: {board: number, box: number}) {
  const {turn, setTurn, currboard, boards, boardWinners, gameWinner, makeMove} = useTurn()
  const val = boards[board][box]
  const boxok = boardWinners[board] == 0 && gameWinner == 0
  const onClick = () => {
    if (boxok && val == 0 && (board == currboard || currboard == undefined)) {
      makeMove(board, box, turn)
      if (turn == 1) {
        setTurn(2)
      } else {
        setTurn(1)
      }
    }
  }
  return (
    <Box sx={{aspectRatio: '1', boxSizing: 'border-box', border: '1px solid #646466',
      display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      onClick={onClick}>
      {val == 1 ? (
        <Box sx={{width: '60%', aspectRatio: '1', position: 'relative',
          '&::before, &::after': {
            content: '""', position: 'absolute', top: '50%', left: 0,
            width: '100%', height: '4px', backgroundColor: '#2246f9',
          },
          '&::before': {transform: 'translateY(-50%) rotate(45deg)'},
          '&::after': {transform: 'translateY(-50%) rotate(-45deg)'},
        }} />
      ) : val == 2 ? (
        <Box sx={{width: '60%', aspectRatio: '1', boxSizing: 'border-box',
          borderRadius: '50%', border: '4px solid #ff0011'}} />
      ) : ''}
    </Box>
  )
}
