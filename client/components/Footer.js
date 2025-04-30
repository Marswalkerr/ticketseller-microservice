import React from 'react';
import Link from 'next/link';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#212529', color: 'white', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              TicketSeller
            </Typography>
            <Typography variant="body2" color="lightgray">
              Your one-stop destination for concerts, sports,
              theater, and more. Find and sell tickets for your
              favorite events.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/">
                  <a style={{ color: 'lightgray', textDecoration: 'none' }}>Home</a>
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/?category=concerts">
                  <a style={{ color: 'lightgray', textDecoration: 'none' }}>Concerts</a>
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/?category=sports">
                  <a style={{ color: 'lightgray', textDecoration: 'none' }}>Sports</a>
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/?category=theater">
                  <a style={{ color: 'lightgray', textDecoration: 'none' }}>Theater</a>
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/?category=conferences">
                  <a style={{ color: 'lightgray', textDecoration: 'none' }}>Conferences</a>
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="lightgray" paragraph>
              Email: support@ticketseller.dev
            </Typography>
            <Typography variant="body2" color="lightgray" paragraph>
              Phone: +1 (123) 456-7890
            </Typography>
            <Typography variant="body2" color="lightgray">
              Hours: Mon-Fri 9am-5pm
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton aria-label="facebook" sx={{ color: 'white', mr: 1, p: 0 }}>
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="twitter" sx={{ color: 'white', mr: 1, p: 0 }}>
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="instagram" sx={{ color: 'white', mr: 1, p: 0 }}>
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="linkedin" sx={{ color: 'white', p: 0 }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="lightgray" align="center">
            © {new Date().getFullYear()} TicketSeller. All rights reserved.
          </Typography>
          <Typography variant="body2" color="lightgray" align="center" sx={{ mt: 1 }}>
            <Link href="/terms">
              <a style={{ color: 'lightgray', textDecoration: 'none', marginRight: '16px' }}>
                Terms of Service
              </a>
            </Link>
            <Link href="/privacy">
              <a style={{ color: 'lightgray', textDecoration: 'none' }}>
                Privacy Policy
              </a>
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 