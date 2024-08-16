import { Link } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';
import React, { useState } from 'react';
import { Box, TextField, Button, Stack, Typography } from '@mui/material';
import './index.scss'
import Inventory from "../Inventory";
import Dashboard from '../../assets/Dashboard icon.png';
import Analytics from '../../assets/Analytics icon.png';

export default function Inventorypage() {
  const { user } = useUser(); // Access user data

  const [formData, setFormData] = useState({
    unitPrice: '',
    name: '',
    time: '',
    day: '',
    country: ''
  });

  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a result after form submission
    const simulatedResult = `Restock Recommendation: ${formData.unitPrice} units of ${formData.name} in ${formData.country}`;
    setResult(simulatedResult);
  };

  return (
    <div className="index-page">
      <h1>Greetings, {user ? user.firstName : "Guest"}</h1>
      <h2>Dashboard <img src={Dashboard}></img></h2>
      <Inventory></Inventory>
      <h2>Analytics<img src={Analytics}></img></h2>
      <p>Based on the inputs, your machine learning model will predict whether to restock or unstock 
        the item and by how much. <br></br><br></br> The model uses these features to analyze patterns and make inventory 
        recommendations, optimizing stock levels efficiently.</p>
        <Box
      display="flex" // Flexbox for side-by-side layout
      gap="20px" // Gap between the form and result box
      marginLeft='48vw'
      marginTop='5vh'
    >
      {/* Form Box */}
      <Box
        width="300px"
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {/* Unit Price Field */}
            <TextField
              label="Unit Price"
              variant="outlined"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
              fullWidth
              sx={{
                borderRadius: '12px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& input': {
                  color: 'white',
                  fontWeight: 'bold',
                },
                '& label': {
                  color: 'white',
                },
                '& .Mui-focused': {
                  color: 'white',
                },
              }}
            />
            {/* Name Field */}
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              sx={{
                borderRadius: '12px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& input': {
                  color: 'white',
                  fontWeight: 'bold',
                },
                '& label': {
                  color: 'white',
                },
                '& .Mui-focused': {
                  color: 'white',
                },
              }}
            />
            {/* Time Field */}
            <TextField
              label="Time"
              variant="outlined"
              name="time"
              value={formData.time}
              onChange={handleChange}
              fullWidth
              sx={{
                borderRadius: '12px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& input': {
                  color: 'white',
                  fontWeight: 'bold',
                },
                '& label': {
                  color: 'white',
                },
                '& .Mui-focused': {
                  color: 'white',
                },
              }}
            />
            {/* Day Field */}
            <TextField
              label="Day"
              variant="outlined"
              name="day"
              value={formData.day}
              onChange={handleChange}
              fullWidth
              sx={{
                borderRadius: '12px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& input': {
                  color: 'white',
                  fontWeight: 'bold',
                },
                '& label': {
                  color: 'white',
                },
                '& .Mui-focused': {
                  color: 'white',
                },
              }}
            />
            {/* Country Field */}
            <TextField
              label="Country"
              variant="outlined"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
              sx={{
                borderRadius: '12px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& input': {
                  color: 'white',
                  fontWeight: 'bold',
                },
                '& label': {
                  color: 'white',
                },
                '& .Mui-focused': {
                  color: 'white',
                },
              }}
            />
            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius:'12px',
                fontWeight:'bold',
                backgroundColor: '#a486f7',
                color: 'black', // Set button text color to black
                '&:hover': {
                  backgroundColor: '#a486f7',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Analyse
            </Button>
          </Stack>
        </form>
      </Box>

      {/* Result Box */}
      <Box
        width="300px" // Same width as the form
        padding="20px"
        boxShadow="0px 0px 15px rgba(0, 0, 0, 0.1)"
        borderRadius="8px"
        bgcolor="#2525257e"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="body1" color="white">
        </Typography>
      </Box>
    </Box>
    </div>
  );
}