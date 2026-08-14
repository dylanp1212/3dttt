import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tttboard from './tttboard'
import {TurnContext} from './turnContext'
import {useState} from 'react'

export default function Gameboard() {
  const [turn, setTurn] = useState<1|2>(1)
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
      {/* <Tttbox turn={turn} boxok={true} val={val} setVal={setVal} /> */}
      <TurnContext.Provider value={{turn, setTurn}}>
        <Tttboard />
      </TurnContext.Provider>
    </Box>
  )
}