import Box from '@mui/material/Box';
import {useTurn} from './turnContext'

export default function Tttbox({boxok, val, updateGrid, box, board}: {boxok: boolean,
  val: number, updateGrid: (box: number, val: 1|2) => void, box: number, board: number}) {
  const {turn, setTurn, currboard} = useTurn()
  const onClick = () => {
    if (boxok && val == 0 && (board == currboard || currboard == undefined)) {
      updateGrid(box, turn)
      if (turn == 1) {
        setTurn(2)
      } else {
        setTurn(1)
      }
    }
  }
  return (
    <Box sx={{width: '50px', height: '50px', border: '1px solid #646466',
      display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      onClick={onClick}>
      {val == 1 ? (
        <Box sx={{width: '30px', height: '30px', position: 'relative',
          '&::before, &::after': {
            content: '""', position: 'absolute', top: '50%', left: 0,
            width: '100%', height: '4px', backgroundColor: '#2246f9',
          },
          '&::before': {transform: 'translateY(-50%) rotate(45deg)'},
          '&::after': {transform: 'translateY(-50%) rotate(-45deg)'},
        }} />
      ) : val == 2 ? (
        <Box sx={{width: '30px', height: '30px', boxSizing: 'border-box',
          borderRadius: '50%', border: '4px solid #ff0011'}} />
      ) : ''}
    </Box>
  )
}