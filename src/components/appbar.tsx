'use client'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useRouter} from 'next/navigation';
// import DrawerButton from './drawerButton';

export default function Appbar({title}: {title?: string}) {
  const router = useRouter();
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="fixed" color="transparent" sx={{bgcolor: '#15151b',
        boxShadow: 'none', borderBottom: '1px solid #6c81e9', zIndex: 2000}}>
        <Toolbar>
          {/* <DrawerButton /> */}
          <Box onClick={() => router.push('/')}>
            <Typography variant="h5" sx={{flexGrow: 1, fontWeight: 600,
              color: '#6c81e9'}}>
              {title ? title :
                <>3D <span style={{color: '#ff0011'}}>Tic </span>
                <span style={{color: '#2246f9'}}>Tac</span> Toe</>
              }
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
    </Box>
  );
}