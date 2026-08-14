import Box from '@mui/material/Box';
import {useTurn} from './turnContext'

export default function Tttbox({boxok, val, updateGrid, box, board}: {boxok: boolean,
  val: number, updateGrid: (box: number, val: 1|2) => void, box: number, board: number}) {
  const {turn, setTurn, currboard, setCurrboard, grid} = useTurn()
  const onClick = () => {
    if (boxok && val == 0 && (board == currboard || currboard == undefined)) {
      updateGrid(box, turn)
      if (turn == 1) {
        setTurn(2)
      } else {
        setTurn(1)
      }
      if (grid[box] != 0) {
        setCurrboard(undefined)
      } else {
        setCurrboard(box)
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