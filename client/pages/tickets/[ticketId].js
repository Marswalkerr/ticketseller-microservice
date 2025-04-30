import Router from "next/router";
import Link from "next/link";
import buildClient from "../../api/buildClient";
import { useRequest } from "../../hooks/useRequest";
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Paper,
  Chip,
  Divider,
  Card,
  Alert,
  Tooltip
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import InfoIcon from '@mui/icons-material/Info';

const TicketShow = ({ ticket, currentUser }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push("/orders/[orderId]", `/orders/${order.id}`),
  });

  // Determine image based on category
  const getCategoryImage = () => {
    const category = ticket.category || 'concerts';
    const categoryImages = {
      concerts: '/concert.jpg',
      sports: '/sports.jpg',
      theater: '/theater.jpg',
      conferences: '/conference.jpg',
    };
    
    return ticket.imageUrl || categoryImages[category] || categoryImages.concerts;
  };
  
  // Check if the current user is the creator of this ticket
  const isOwnTicket = currentUser && ticket.userId === currentUser.id;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Link href="/">
          <a style={{ display: 'flex', alignItems: 'center', color: '#5D3FD3', textDecoration: 'none' }}>
            <Box component="span" sx={{ mr: 1 }}>
              ←
            </Box>
            Back to all tickets
          </a>
        </Link>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Box 
            component="img"
            src={getCategoryImage()}
            alt={ticket.title}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '500px',
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: 3
            }}
          />
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 4, 
              borderRadius: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Chip 
                label={ticket.category ? ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1) : 'Event'} 
                size="small" 
                sx={{ 
                  bgcolor: ticket.category === 'concerts' ? '#5D3FD3' : 
                          ticket.category === 'sports' ? '#2196f3' :
                          ticket.category === 'theater' ? '#f44336' : '#ff9800',
                  color: 'white',
                  fontWeight: 500,
                  mb: 1
                }} 
              />
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
                {ticket.title}
              </Typography>
              
              {ticket.date && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body1" color="text.secondary">
                    {ticket.date}
                  </Typography>
                </Box>
              )}
              
              {ticket.location && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body1" color="text.secondary">
                    {ticket.location}
                  </Typography>
                </Box>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" component="p" gutterBottom>
                Price
              </Typography>
              <Typography variant="h3" component="p" sx={{ fontWeight: 600, color: '#5D3FD3' }}>
                ${parseFloat(ticket.price).toFixed(2)}
              </Typography>
              <Chip 
                label="Available" 
                size="small" 
                sx={{ 
                  bgcolor: '#e8f5e9', 
                  color: '#2e7d32',
                  mt: 1 
                }} 
              />
            </Box>

            {errors && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors}
              </Alert>
            )}
            
            {isOwnTicket && (
              <Alert 
                severity="info" 
                icon={<InfoIcon />}
                sx={{ mb: 2 }}
              >
                This is your ticket listing. You cannot purchase your own ticket.
              </Alert>
            )}

            <Box sx={{ mt: 'auto' }}>
              <Button 
                variant="contained" 
                size="large"
                fullWidth
                startIcon={<ConfirmationNumberIcon />}
                onClick={() => doRequest()} 
                disabled={isOwnTicket}
                sx={{ 
                  py: 1.5,
                  bgcolor: '#5D3FD3',
                  '&:hover': {
                    bgcolor: '#3824A8'
                  },
                  '&.Mui-disabled': {
                    bgcolor: 'rgba(0, 0, 0, 0.12)',
                    color: 'rgba(0, 0, 0, 0.26)'
                  }
                }}
              >
                {isOwnTicket ? 'Your Own Ticket' : 'Purchase Ticket'}
              </Button>
              {!isOwnTicket && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                  Secure transaction. Tickets will be delivered electronically.
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {ticket.description && (
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                Event Details
              </Typography>
              <Typography variant="body1">
                {ticket.description}
              </Typography>
            </Paper>
          </Grid>
        )}

        <Grid item xs={12}>
          <Card sx={{ p: 4, borderRadius: 2, mt: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Seller Information
            </Typography>
            <Typography variant="body1">
              This ticket is sold through TicketSeller's trusted marketplace. All purchases are protected by our buyer guarantee.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const { ticketId } = context.query;
  const client = buildClient(context);

  try {
    // Get the current ticket
    const { data: ticket } = await client.get(`/api/tickets/${ticketId}`);

    // Also get the current user
    const { data: userData } = await client.get('/api/users/currentuser');

    return {
      props: {
        ticket,
        currentUser: userData.currentUser,
      },
    };
  } catch (error) {
    console.error('Error fetching ticket or user:', error);
    
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

export default TicketShow;
