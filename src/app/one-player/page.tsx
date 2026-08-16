'use client'
import Appbar from '../../components/appbar'
import Box from '@mui/material/Box';
import Gameboard from '../../components/gameboard'

export default function Oneplayer() {
  return (
    <>
      <Appbar />
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Gameboard mode={1}/>
      </Box>
      {/* <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Typography variant="h1" sx={{flexGrow: 1, fontWeight: 600,
            color: '#6c81e9'}}>
            Coming soon...
          </Typography>
        </Box>
      </Box> */}
    </>
  )
}