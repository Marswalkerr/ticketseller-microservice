import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";
import Link from "next/link";
import buildClient from "../../api/buildClient";
import { useRequest } from "../../hooks/useRequest";
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid,
  Button,
  Divider,
  Chip,
  Alert,
  Card,
  LinearProgress,
  Stack
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerId, setTimerId] = useState(null);
  
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 1000);
    setTimerId(timerId);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  useEffect(() => {
    if (timeLeft <= 0 && timerId) {
      clearInterval(timerId);
    }
  }, [timeLeft, timerId]);

  // Format status for display
  const formatStatus = (status) => {
    switch(status) {
      case 'created':
      case 'awaiting:payment':
        return { 
          label: 'Awaiting Payment', 
          color: '#ff9800', 
          bgColor: '#fff3e0',
          icon: <PaymentIcon /> 
        };
      case 'complete':
        return { 
          label: 'Completed', 
          color: '#2e7d32', 
          bgColor: '#e8f5e9',
          icon: <CheckCircleIcon /> 
        };
      case 'cancelled':
        return { 
          label: 'Cancelled', 
          color: '#d32f2f', 
          bgColor: '#ffebee',
          icon: <CancelIcon /> 
        };
      default:
        return { 
          label: status.charAt(0).toUpperCase() + status.slice(1), 
          color: '#757575', 
          bgColor: '#f5f5f5',
          icon: <ReceiptIcon /> 
        };
    }
  };
  
  const status = formatStatus(order.status);
  
  // Format time remaining for display
  const formatTimeRemaining = () => {
    if (timeLeft <= 0) return '0:00';
    
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage for countdown
  const calculateProgress = () => {
    if (timeLeft <= 0) return 100;
    
    const totalTime = 15 * 60; // Expiration is typically 15 minutes
    const elapsedTime = totalTime - timeLeft;
    return (elapsedTime / totalTime) * 100;
  };

  if (order.status === 'cancelled') {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Link href="/orders">
            <a style={{ display: 'flex', alignItems: 'center', color: '#5D3FD3', textDecoration: 'none' }}>
              <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
              Back to my orders
            </a>
          </Link>
        </Box>
        
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
          <CancelIcon sx={{ fontSize: 64, color: '#d32f2f', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            Order Cancelled
          </Typography>
          <Typography variant="body1" paragraph>
            This order has been cancelled and is no longer available.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Order ID: <Box component="span" sx={{ fontFamily: 'monospace' }}>#{order.id}</Box>
          </Typography>
          <Button 
            variant="contained" 
            component={Link} 
            href="/"
            sx={{ 
              bgcolor: '#5D3FD3',
              '&:hover': {
                bgcolor: '#3824A8'
              }
            }}
          >
            Browse More Events
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Link href="/orders">
          <a style={{ display: 'flex', alignItems: 'center', color: '#5D3FD3', textDecoration: 'none' }}>
            <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
            Back to my orders
          </a>
        </Link>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', mb: 3 }}>
              <Box>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                  Order Details
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Order ID: <Box component="span" sx={{ fontFamily: 'monospace' }}>#{order.id}</Box>
                </Typography>
              </Box>
              <Chip 
                icon={status.icon} 
                label={status.label} 
                sx={{ 
                  bgcolor: status.bgColor, 
                  color: status.color,
                  fontWeight: 500,
                  pl: 1
                }} 
              />
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                Ticket Information
              </Typography>
              <Card sx={{ p: 3, borderRadius: 2, bgcolor: '#f8f9fa' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box 
                    sx={{ 
                      minWidth: 80, 
                      height: 80, 
                      mr: 3, 
                      bgcolor: '#f0f0f0', 
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#5D3FD3'
                    }}
                  >
                    {order.ticket.category === 'concerts' && <Box className="fas fa-music fa-2x" component="span" />}
                    {order.ticket.category === 'sports' && <Box className="fas fa-basketball-ball fa-2x" component="span" />}
                    {order.ticket.category === 'theater' && <Box className="fas fa-theater-masks fa-2x" component="span" />}
                    {order.ticket.category === 'conferences' && <Box className="fas fa-microphone fa-2x" component="span" />}
                    {!order.ticket.category && <Box className="fas fa-ticket-alt fa-2x" component="span" />}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                      {order.ticket.title}
                    </Typography>
                    
                    {order.ticket.date && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {order.ticket.date}
                        </Typography>
                      </Box>
                    )}
                    
                    {order.ticket.location && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOnIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {order.ticket.location}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h5" component="p" sx={{ fontWeight: 600, color: '#5D3FD3' }}>
                      ${parseFloat(order.ticket.price).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Box>
            
            {order.status === 'created' && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                  Payment Details
                </Typography>
                
                <Card sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                  <Typography variant="body1" paragraph>
                    Please complete your purchase within the time remaining. After the timer expires, 
                    your order will be cancelled and the ticket will be available for others to purchase.
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccessTimeIcon sx={{ mr: 1, color: timeLeft <= 60 ? '#d32f2f' : '#ff9800' }} />
                    <Typography 
                      variant="h6" 
                      component="p" 
                      sx={{ 
                        fontWeight: 600, 
                        fontFamily: 'monospace',
                        color: timeLeft <= 60 ? '#d32f2f' : '#ff9800'
                      }}
                    >
                      {formatTimeRemaining()}
                    </Typography>
                  </Box>
                  
                  <LinearProgress 
                    variant="determinate" 
                    value={calculateProgress()} 
                    sx={{ 
                      mb: 2, 
                      height: 8, 
                      borderRadius: 4,
                      bgcolor: '#f5f5f5',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: timeLeft <= 60 ? '#d32f2f' : '#ff9800'
                      }
                    }} 
                  />
                </Card>
                
                {errors && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {errors}
                  </Alert>
                )}
                
                {timeLeft > 0 ? (
                  <StripeCheckout
                    token={({ id }) => doRequest({ token: id })}
                    stripeKey="pk_test_your_key"
                    amount={order.ticket.price * 100}
                    email={currentUser.email}
                    currency="USD"
                  >
                    <Button 
                      variant="contained" 
                      size="large"
                      startIcon={<PaymentIcon />}
                      fullWidth
                      sx={{ 
                        py: 1.5,
                        bgcolor: '#5D3FD3',
                        '&:hover': {
                          bgcolor: '#3824A8'
                        }
                      }}
                    >
                      Complete Purchase
                    </Button>
                  </StripeCheckout>
                ) : (
                  <Alert severity="error">
                    Order expired. Please create a new order to purchase this ticket.
                  </Alert>
                )}
              </Box>
            )}
            
            {order.status === 'complete' && (
              <Box sx={{ mb: 4 }}>
                <Alert 
                  icon={<CheckCircleIcon fontSize="inherit" />} 
                  severity="success" 
                  sx={{ mb: 3 }}
                >
                  Your purchase is complete! Thank you for your order.
                </Alert>
                
                <Stack direction="row" spacing={2}>
                  <Button 
                    variant="contained" 
                    component={Link} 
                    href="/"
                    sx={{ 
                      bgcolor: '#5D3FD3',
                      '&:hover': {
                        bgcolor: '#3824A8'
                      }
                    }}
                  >
                    Browse More Events
                  </Button>
                  <Button 
                    variant="outlined"
                    sx={{ 
                      borderColor: '#5D3FD3', 
                      color: '#5D3FD3',
                      '&:hover': {
                        borderColor: '#3824A8',
                        bgcolor: 'rgba(93, 63, 211, 0.04)'
                      }
                    }}
                  >
                    View E-Ticket
                  </Button>
                </Stack>
              </Box>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Order Summary
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="body1">Ticket Price</Typography>
                <Typography variant="body1">${parseFloat(order.ticket.price).toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="body1">Service Fee</Typography>
                <Typography variant="body1">$0.00</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Total</Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>${parseFloat(order.ticket.price).toFixed(2)}</Typography>
              </Box>
            </Box>
            
            {order.status === 'created' && timeLeft <= 0 && (
              <Alert severity="error" sx={{ mb: 2 }}>
                Order cancelled
              </Alert>
            )}
            
            {order.status === 'complete' && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Payment completed
              </Alert>
            )}
            
            <Typography variant="body2" color="text.secondary" paragraph>
              Tickets are non-refundable. Please review our Terms of Service for more information.
            </Typography>
          </Paper>
          
          <Card sx={{ p: 3, borderRadius: 2, bgcolor: '#f8f9fa' }}>
            <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
              Need Help?
            </Typography>
            <Typography variant="body2" paragraph>
              If you have any questions about your order, please contact our customer support:
            </Typography>
            <Typography variant="body2">
              Email: support@ticketseller.dev
            </Typography>
            <Typography variant="body2">
              Phone: +1 (123) 456-7890
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const { orderId } = context.query;
  const client = buildClient(context);

  try {
    const { data } = await client.get(`/api/orders/${orderId}`);
    
    return {
      props: {
        order: data,
      },
    };
  } catch (error) {
    console.error('Error fetching order:', error);
    
    return {
      redirect: {
        destination: '/orders',
        permanent: false,
      },
    };
  }
}

export default OrderShow;
