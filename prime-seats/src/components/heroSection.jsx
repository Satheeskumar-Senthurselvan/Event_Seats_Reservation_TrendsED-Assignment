import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function HeroSection() {
  return (
    <Box
      sx={{
        height: '60vh',
        backgroundImage: 'url("https://eventnerve.s3.ap-south-1.amazonaws.com/BG_with_hero_6ff585449d.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        p: 4,
      }}
    >
      <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
        Event Reserved
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Experience the Best Events with PrimeSeats
      </Typography>
      <Button variant="contained"  sx={{ mt: 3, backgroundColor:'#ff6347'}}>
        Get Tickets
      </Button>
    </Box>
  )
}
