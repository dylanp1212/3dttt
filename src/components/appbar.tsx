'use client'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import DrawerButton from './drawerButton';


export default function Appbar({title}: {title?: string}) {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="fixed" color="transparent" sx={{bgcolor: '#15151b',
        boxShadow: 'none', borderBottom: '1px solid #6c81e9', zIndex: 2000}}>
        <Toolbar>
          {/* <DrawerButton /> */}
          <Typography variant="h5" component="div" sx={{flexGrow: 1,
            fontFamily: '"Lexend", sans-serif', fontWeight: 600,
            letterSpacing: '-0.01em', color: '#6c81e9'}}>
            {title ? title :
              <>3D <span style={{color: '#ff0011'}}>Tic</span>
              <span style={{color: '#2246f9'}}>Tac</span> Toe</>
            }
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
    </Box>
  );
}