import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
  } from "@mui/material";
  

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitForm(formData);
    };

    const submitForm = async (data) => {
        try {
          const response = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
      
          const result = await response.json();
      
          if (response.ok) {
            localStorage.setItem('authToken', result.token); // Store JWT token
            alert("Login successful!");
            navigate('/'); // Redirect to home page after login
          } else {
            alert(`Error: ${result.message}`);
          }
        } catch (err) {
          console.error("An error occurred during login:", err);
          alert("An error occurred during login.");
        }
      };
      

  return (
    <Container sx={{ mt: 10, mb: 8 }} maxWidth="sm">
    <Box
      sx={{
        mt: 4,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          type="email"
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          type="password"
          required
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, backgroundColor:'#ff6347' }}
          type="submit"
        >
          Login
        </Button>
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account? <a href="/register">Register</a>
      </Typography>
    </Box>
  </Container>
  )
}
