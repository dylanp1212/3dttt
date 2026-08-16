'use client'
import Appbar from '../../components/appbar'
import Gameboard from '../../components/gameboard'
import Box from '@mui/material/Box';

export default function Twoplayers() {
  return (
    <>
      <Appbar />
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Gameboard mode={2}/>
      </Box>
    </>
  )
}