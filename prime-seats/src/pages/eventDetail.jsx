import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Box, Typography, Grid, Container } from "@mui/material";

export default function EventDetails() {
  const { id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const [seats, setSeats] = useState([]); // Seat data
  const [loading, setLoading] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState(null); // Track selected seat
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch event details and seats data
  useEffect(() => {
    console.log("Event ID from URL:", id);  // Log the event ID
  
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/event/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }
        const data = await response.json();
        setEvent(data.event);

        let sanitizedSeats = data.seats || '[]';  // Default to empty array if no seats
        sanitizedSeats = sanitizedSeats
          .replace(/\n/g, "")        // Remove newline characters
          .replace(/\s{2,}/g, " ");
          try {
            // Parse the cleaned-up seats string
            const parsedSeats = JSON.parse(sanitizedSeats);
  
            if (Array.isArray(parsedSeats)) {
              setSeats(parsedSeats); // Set seats to the parsed array
            } else {
              setError("Seats data is not an array.");
            }
          } catch (err) {
            setError("Error parsing seats JSON: " + err.message);
          }

        
      } catch (err) {
        console.error('Fetch Error:', err); // Log the error in the console
        setError(err.message); // Set the error to state for displaying on UI
      } finally {
        setLoading(false);
      }
    };
  
    fetchEventDetails();
  }, [id]);
  
  // Handle seat selection
  const handleSeatSelect = (seatLabel) => {
    setSelectedSeat(seatLabel);
  };

  // Handle seat booking
  const handleBooking = async () => {
    if (!selectedSeat) {
      setError('Please select a seat to book.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/event/${id}/book-seat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seatLabel: selectedSeat,
          userId: '673ca49a09978406bbf14a09',  // Example userId, replace with actual user ID
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'An error occurred during booking.');
        return;
      }

      // If booking is successful
      alert('Seat booked successfully!');
      navigate(`/checkout/${id}`);
    } catch (err) {
      setError('An error occurred during booking.');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{event.title}</Typography>
      <Typography variant="body1" gutterBottom>{event.description}</Typography>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>Seating Chart</Typography>
        <Grid container spacing={2} mt={2}>
        {
  Array.isArray(seats) && seats.map(seat => (
    
    <Grid item xs={3} sm={2} md={1} key={seat.label}>
      <Button
        variant="contained"
        color={seat.occupied ? 'error' : seat.selected ? 'primary' : 'success'}
        onClick={() => handleSeatSelect(seat.label)}
        disabled={seat.occupied}
        sx={{ width: "100%" }}
      >
        {seat.label}
      </Button>
    </Grid>
  ))
}

        </Grid>
      </Box>

      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleBooking}>
          Book Selected Seat
        </Button>
      </Box>
    </Container>
  );
}
