import Box from '@mui/material/Box';
import Tttbox from './tttbox'
import {useTurn} from './turnContext'

export default function Tttboard({board}: {board: number}) {
  const {currboard, boards, boardWinners} = useTurn()
  const grid = boards[board]
  const winner = boardWinners[board]
  return (
    <Box sx={{display: 'grid', position: 'relative',
      border: `3px solid ${winner == 1 ? '#2246f9' : winner == 2 ? '#ff0011' : (currboard == board || currboard == undefined) ? '#6c81e9' : '#646466'}`,
      gridTemplateColumns: 'repeat(3, 50px)'}}>
      {grid.map(
        (val, index) => {
          return(
            <Tttbox board={board} box={index} key={index} />
          )
        }
      )}
      {winner == 1 || winner == 2 ? (
        <Box sx={{position: 'absolute', inset: 0, display: 'flex',
          justifyContent: 'center', alignItems: 'center', pointerEvents: 'none',
          backgroundColor: (winner == 1 ? 'rgba(34, 70, 249, 0.4)' : 'rgba(255, 0, 17, 0.4)')}}>
          {winner == 1 ? (
            <Box sx={{width: '120px', height: '120px', position: 'relative',
              '&::before, &::after': {
                content: '""', position: 'absolute', top: '50%', left: 0,
                width: '100%', height: '12px', backgroundColor: '#2246f9',
              },
              '&::before': {transform: 'translateY(-50%) rotate(45deg)'},
              '&::after': {transform: 'translateY(-50%) rotate(-45deg)'},
            }} />
          ) : (
            <Box sx={{width: '120px', height: '120px', boxSizing: 'border-box',
              borderRadius: '50%', border: '12px solid #ff0011'}} />
          )}
        </Box>
      ) : ((currboard != board && currboard != undefined) || winner == 3) ?
        <Box sx={{position: 'absolute', inset: 0, display: 'flex',
          justifyContent: 'center', alignItems: 'center', pointerEvents: 'none',
          backgroundColor: 'rgba(100, 100, 102, 0.4)'}}>
        </Box> : null
      }
    </Box>
  )
}
