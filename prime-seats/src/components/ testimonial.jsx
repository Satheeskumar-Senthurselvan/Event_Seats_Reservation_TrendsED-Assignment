import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export default function  Testimonial({ name, image, quote }) {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Avatar src={image} alt={name} sx={{ width: 80, height: 80, mx: 'auto' }} />
      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        {quote}
      </Typography>
    </Box>
  )
}
