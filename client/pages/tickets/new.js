import { useState } from "react";
import { useRequest } from "../../hooks/useRequest";
import Router from "next/router";
import Link from "next/link";
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  IconButton,
  InputAdornment,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("concerts");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price,
      category,
      location,
      date,
      time,
      imageUrl,
      description
    },
    onSuccess: () => Router.push("/"),
  });

  const onBlur = () => {
    const curPrice = parseFloat(price);
    if (isNaN(curPrice)) {
      return;
    }

    setPrice(curPrice.toFixed(2));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Link href="/">
          <a style={{ display: 'flex', alignItems: 'center', color: '#5D3FD3', textDecoration: 'none' }}>
            <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
            Back to all tickets
          </a>
        </Link>
      </Box>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
          Create a Ticket
        </Typography>
        
        {errors && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errors}
          </Alert>
        )}
        
        <Box component="form" onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                required
                placeholder="Event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                required
                placeholder="0.00"
                value={price}
                onBlur={onBlur}
                onChange={(e) => setPrice(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="concerts">Concerts</MenuItem>
                  <MenuItem value="sports">Sports</MenuItem>
                  <MenuItem value="theater">Theater</MenuItem>
                  <MenuItem value="conferences">Conferences</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                placeholder="Event location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Date"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Time"
                type="time"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                helperText="Enter a URL for an image to be displayed with your ticket listing"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                placeholder="Provide details about your event"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              sx={{ 
                px: 5, 
                py: 1.5,
                bgcolor: '#5D3FD3',
                '&:hover': {
                  bgcolor: '#3824A8'
                }
              }}
            >
              Create Ticket
            </Button>
          </Box>
        </Box>
      </Paper>
      
      <Paper elevation={2} sx={{ p: 3, mt: 3, borderRadius: 2, bgcolor: '#f8f9fa' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <HelpOutlineIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
            Tips for creating a successful ticket listing
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
          <li>Use a clear, descriptive title that includes the event name</li>
          <li>Set a fair price based on the ticket's face value</li>
          <li>Include the exact date, time, and location of the event</li>
          <li>Add a high-quality image to make your listing stand out</li>
          <li>Provide detailed information about the event in the description</li>
        </Typography>
      </Paper>
    </Container>
  );
};

export default NewTicket;
