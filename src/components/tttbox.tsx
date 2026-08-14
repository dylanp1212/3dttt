import Box from '@mui/material/Box';
import {useTurn} from './turnContext'

export default function Tttbox({boxok, val, updateGrid, box}: {boxok: boolean,
  val: number, updateGrid: (box: number, val: 1|2) => void, box: number}) {
  const {turn, setTurn} = useTurn()
  const onClick = () => {
    if (boxok && val == 0) {
      updateGrid(box, turn)
      if (turn == 1) {
        setTurn(2)
      } else {
        setTurn(1)
      }
    }
  }
  return (
    <Box sx={{width: '50px', height: '50px', border: '1px solid #646466'}}
      onClick={onClick}>
      {val == 1 ? 'X' : val == 2 ? 'O' : ''}
    </Box>
  )
}