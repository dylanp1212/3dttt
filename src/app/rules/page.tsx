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
        <Box sx={{display: 'flex', justifyContent: 'center', mt: '30px'}}>
          <Typography variant="h5" sx={{flexGrow: 1, fontWeight: 600,
            color: '#6c81e9'}}>
            damn bruh have some patience
          </Typography>
        </Box>
      </Box>
    </>
  )
}