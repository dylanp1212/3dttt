'use client'

import Appbar from '../components/appbar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useRouter} from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Appbar />
      <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Typography variant="h1" sx={{flexGrow: 1, fontWeight: 600,
            color: '#6c81e9'}}>
              3D <span style={{color: '#ff0011'}}>Tic </span>
              <span style={{color: '#2246f9'}}>Tac</span> Toe
          </Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center',
          width: '300px', height: '300px', border: '2px solid #6c81e9',
          borderRadius: '10px'}}>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center',
          border: '2px solid #2246f9', borderRadius: '10px',
          p: '10px', mt: '10px', width: '280px', cursor: 'pointer',
          transition: 'background-color 0.2s ease',
          '&:hover': {bgcolor: '#2246f9'},
          '&:hover .MuiTypography-root': {color: '#15151b'}}}
          onClick={() => router.push('/one-player')}>
          <Typography variant="h5" sx={{fontWeight: 600, color: '#2246f9',
            transition: 'color 0.2s ease'}}>
            1 Player
          </Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center',
          border: '2px solid #ff0011', borderRadius: '10px',
          p: '10px', mt: '10px', width: '280px', cursor: 'pointer',
          transition: 'background-color 0.2s ease',
          '&:hover': {bgcolor: '#ff0011'},
          '&:hover .MuiTypography-root': {color: '#15151b'}}}
          onClick={() => router.push('/two-players')}>
          <Typography variant="h5" sx={{fontWeight: 600, color: '#ff0011',
            transition: 'color 0.2s ease'}}>
            2 Players
          </Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center',
          border: '2px solid #6c81e9', borderRadius: '10px',
          p: '10px', mt: '10px', width: '280px', cursor: 'pointer',
          transition: 'background-color 0.2s ease',
          '&:hover': {bgcolor: '#6c81e9'},
          '&:hover .MuiTypography-root': {color: '#15151b'}}}
          onClick={() => router.push('/rules')}>
          <Typography variant="h5" sx={{fontWeight: 600, color: '#6c81e9',
            transition: 'color 0.2s ease'}}>
            Rules
          </Typography>
        </Box>
      </Box>
    </>
  )
}
