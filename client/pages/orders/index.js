import buildClient from "../../api/buildClient";
import Link from "next/link";
import { 
  Box, 
  Container, 
  Typography, 
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Alert
} from '@mui/material';
import { useState } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReceiptIcon from '@mui/icons-material/Receipt';

const OrderIndex = ({ orders = [] }) => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Get status counts
  const getStatusCounts = () => {
    const counts = {
      all: orders.length,
      completed: orders.filter(order => order.status === 'complete').length,
      pending: orders.filter(order => order.status === 'created' || order.status === 'awaiting:payment').length,
      cancelled: orders.filter(order => order.status === 'cancelled').length,
    };
    return counts;
  };
  
  const statusCounts = getStatusCounts();
  
  // Filter orders based on active tab
  const getFilteredOrders = () => {
    if (activeTab === 'all') return orders;
    if (activeTab === 'completed') return orders.filter(order => order.status === 'complete');
    if (activeTab === 'pending') return orders.filter(order => order.status === 'created' || order.status === 'awaiting:payment');
    if (activeTab === 'cancelled') return orders.filter(order => order.status === 'cancelled');
    return orders;
  };
  
  const filteredOrders = getFilteredOrders();
  
  // Utility to format status for display
  const formatStatus = (status) => {
    switch(status) {
      case 'created':
      case 'awaiting:payment':
        return { 
          label: 'Awaiting Payment', 
          color: '#ff9800', 
          bgColor: '#fff3e0' 
        };
      case 'complete':
        return { 
          label: 'Completed', 
          color: '#2e7d32', 
          bgColor: '#e8f5e9' 
        };
      case 'cancelled':
        return { 
          label: 'Cancelled', 
          color: '#d32f2f', 
          bgColor: '#ffebee' 
        };
      default:
        return { 
          label: status.charAt(0).toUpperCase() + status.slice(1), 
          color: '#757575', 
          bgColor: '#f5f5f5' 
        };
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <ReceiptIcon sx={{ fontSize: 32, mr: 2, color: '#5D3FD3' }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          My Orders
        </Typography>
      </Box>
      
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        View and manage your ticket orders
      </Typography>
      
      {orders.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            You don't have any orders yet
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            Start browsing events and purchase tickets to see your orders here.
          </Typography>
          <Link href="/">
            <a style={{ textDecoration: 'none' }}>
              <Button 
                variant="contained" 
                sx={{ 
                  bgcolor: '#5D3FD3',
                  '&:hover': {
                    bgcolor: '#3824A8'
                  }
                }}
              >
                Browse Events
              </Button>
            </a>
          </Link>
        </Paper>
      ) : (
        <>
          <Paper sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              aria-label="order status tabs"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: '#f8f9fa',
                '& .MuiTab-root': { 
                  minWidth: 100,
                  fontWeight: 500
                }
              }}
            >
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    All Orders
                    <Chip label={statusCounts.all} size="small" sx={{ ml: 1 }} />
                  </Box>
                } 
                value="all" 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Completed
                    {statusCounts.completed > 0 && (
                      <Chip label={statusCounts.completed} size="small" sx={{ ml: 1 }} />
                    )}
                  </Box>
                } 
                value="completed" 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Pending
                    {statusCounts.pending > 0 && (
                      <Chip label={statusCounts.pending} size="small" sx={{ ml: 1 }} />
                    )}
                  </Box>
                } 
                value="pending" 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Cancelled
                    {statusCounts.cancelled > 0 && (
                      <Chip label={statusCounts.cancelled} size="small" sx={{ ml: 1 }} />
                    )}
                  </Box>
                } 
                value="cancelled" 
              />
            </Tabs>
            
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                    <TableCell sx={{ fontWeight: 600 }}>EVENT</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>ORDER ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>PRICE</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const status = formatStatus(order.status);
                    return (
                      <TableRow key={order.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box 
                              sx={{ 
                                width: 50, 
                                height: 50, 
                                mr: 2, 
                                bgcolor: '#f0f0f0', 
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#5D3FD3'
                              }}
                            >
                              {order.ticket.category === 'concerts' && <Box className="fas fa-music" component="span" />}
                              {order.ticket.category === 'sports' && <Box className="fas fa-basketball-ball" component="span" />}
                              {order.ticket.category === 'theater' && <Box className="fas fa-theater-masks" component="span" />}
                              {order.ticket.category === 'conferences' && <Box className="fas fa-microphone" component="span" />}
                              {!order.ticket.category && <Box className="fas fa-ticket-alt" component="span" />}
                            </Box>
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {order.ticket.title}
                              </Typography>
                              {order.ticket.date && (
                                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                  <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5, fontSize: '0.875rem' }} />
                                  <Typography variant="body2">
                                    {order.ticket.date}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                            #{order.id.substring(0, 8)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={status.label} 
                            size="small" 
                            sx={{ 
                              bgcolor: status.bgColor, 
                              color: status.color,
                              fontWeight: 500
                            }} 
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            ${parseFloat(order.ticket.price).toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Link href={`/orders/${order.id}`}>
                            <a style={{ textDecoration: 'none' }}>
                              <Button 
                                variant="outlined" 
                                size="small"
                                sx={{ 
                                  borderColor: '#5D3FD3', 
                                  color: '#5D3FD3',
                                  '&:hover': {
                                    borderColor: '#3824A8',
                                    bgcolor: 'rgba(93, 63, 211, 0.04)'
                                  }
                                }}
                              >
                                View Details
                              </Button>
                            </a>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
    </Container>
  );
};

export async function getServerSideProps(context) {
  try {
    const client = buildClient(context);
    const { data } = await client.get("/api/orders");
    
    return {
      props: {
        orders: data,
      },
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return {
      props: {
        orders: [],
      },
    };
  }
}

export default OrderIndex;
