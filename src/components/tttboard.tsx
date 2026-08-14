import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tttbox from './tttbox'
import {useState} from 'react'

export default function Tttboard() {
  const [grid, setGrid] = useState<number[]>([0,0,0,0,0,0,0,0,0])
  // const [val, setVal] = useState<0|1|2>(0)
  const updateGrid = (box: number, val: 1|2) => {
    const newgrid = [...grid]
    newgrid[box] = val
    // console.log(newgrid)
    setGrid(newgrid)
  }
  return (
    <Box sx={{mt: '30px', display: 'grid', border: '3px solid #646466',
      gridTemplateColumns: 'repeat(3, 50px)'}}>
      {grid.map(
        (val, index) => {
          return(
            <Tttbox boxok={true} val={val} updateGrid={updateGrid} box={index} key={index} />
          )
        }
      )}
      {/* <Tttbox turn={turn} boxok={true} val={grid[0]} updateGrid={updateGrid} box={0} /> */}
    </Box>
  )
}