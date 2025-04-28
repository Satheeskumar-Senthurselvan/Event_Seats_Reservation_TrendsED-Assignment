import React from "react";
import { Typography, Box, Container } from "@mui/material";

export default function NotFound() {
  return (
    <Container>
    <Box mt={4}>
      <Typography variant="h3" align="center">
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" mt={2} align="center">
        Sorry, the page you are looking for does not exist.
      </Typography>
    </Box>
  </Container>
  )
}
