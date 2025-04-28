import React from "react";
import { Typography, Container, Box } from "@mui/material";

export default function About() {
  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h3" align="center">
          About Us
        </Typography>
        <Typography variant="body1" mt={2}>
          PrimeSeats is the ultimate platform for booking event seats. From exclusive experiences to VIP seating, we bring you closer to unforgettable events.
        </Typography>
      </Box>
    </Container>
  )
}
