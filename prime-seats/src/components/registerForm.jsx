import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const navigate = useNavigate();

  const isPasswordValid = Object.values(passwordValidations).every(Boolean);

  // Handles changes for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles changes specifically for the password field
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      password,
    }));

    // Update password validation criteria
    setPasswordValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    });
  };

  // Handles confirm password field
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData); // Debug log

    // Check if passwords match
    if (formData.password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Submit the form
    submitForm(formData);
  };

  const submitForm = async (data) => {
    console.log('Submitting form data:', data); // Debug log
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status); // Debug log

      if (response.ok) {
        const result = await response.json();
        console.log('Registration successful:', result);
        alert('Registration successful!');
        navigate('/login');
      } else {
        const error = await response.json();
        console.error('Registration failed:', error);
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error('An error occurred:', err);
      alert('An error occurred during registration.');
    }
  };

  return (
    <Container sx={{ mt: 10, mb: 8 }} maxWidth="sm">
      <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
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
            onChange={handlePasswordChange}
            margin="normal"
            type="password"
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            margin="normal"
            type="password"
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, backgroundColor: isPasswordValid ? '#1976d2' : 'gray' }}
            type="submit"
            disabled={!isPasswordValid}
          >
            Register
          </Button>
        </form>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Password must include:</Typography>
          <List sx={{ padding: 0 }}>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText
                primary="At least 8 characters"
                primaryTypographyProps={{
                  style: { color: passwordValidations.length ? 'green' : 'red' },
                }}
              />
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText
                primary="At least one uppercase letter"
                primaryTypographyProps={{
                  style: { color: passwordValidations.uppercase ? 'green' : 'red' },
                }}
              />
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText
                primary="At least one lowercase letter"
                primaryTypographyProps={{
                  style: { color: passwordValidations.lowercase ? 'green' : 'red' },
                }}
              />
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText
                primary="At least one number"
                primaryTypographyProps={{
                  style: { color: passwordValidations.number ? 'green' : 'red' },
                }}
              />
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText
                primary="At least one special character (!@#$%^&*)"
                primaryTypographyProps={{
                  style: { color: passwordValidations.specialChar ? 'green' : 'red' },
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Container>
  );
}
