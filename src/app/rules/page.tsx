"use client"
import Appbar from '../../components/appbar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Rules() {
  return (
    <>
      <Appbar />
      <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Typography variant="h1" sx={{flexGrow: 1, fontWeight: 600,
            color: '#6c81e9'}}>
            Rules
          </Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center', mt: '30px', flexDirection: 'column', px: '10px', '@media (min-width: 769px)': {px: '100px'}}}>
          <Typography variant="h5" sx={{flexGrow: 1,
            color: '#6c81e9', mb: '50px'}}>
            3D Tic Tac Toe is just like regular Tic Tac Toe, except every box is its own game of Tic Tac Toe.
          </Typography>
          <Typography variant="h5" sx={{flexGrow: 1,
            color: '#6c81e9', mb: '50px'}}>
            Get 3 in a row (up and down, across, or diagonal) in a board to win that board.
          </Typography>
          <Typography variant="h5" sx={{flexGrow: 1,
            color: '#6c81e9', mb: '50px'}}>
            Get 3 boards in a row to win the game.
          </Typography>
          <Typography variant="h5" sx={{flexGrow: 1,
            color: '#6c81e9', mb: '50px'}}>
            The first player can play anywhere. After that, each play must be in the board corresponding to the box the previous play was in. The only exception is if a player plays into a box that corresponds with a board that is already complete (won or drawn), then the next play can go into any non complete box.
          </Typography>
          <Typography variant="h5" sx={{flexGrow: 1,
            color: '#6c81e9', mb: '50px'}}>
            If all boards are complete and neither player has 3 in a row, its a draw.
          </Typography>
        </Box>
      </Box>
    </>
  )
}