import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function FeaturedCard({ id, title, description, image }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 300, mx: 'auto', mt: 4 }}>
      <Box component="img" src={image} alt={title} sx={{ width: '100%', height: '200px' }} />
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {description}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2, backgroundColor: '#ff6347' }}
          onClick={() => navigate(`/event/${id}`)} // Corrected the URL
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

FeaturedCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
