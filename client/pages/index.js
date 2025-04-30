import { useState, useEffect } from 'react';
import buildClient from "../api/buildClient";
import Link from "next/link";
import { useRouter } from 'next/router';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Chip,
  InputAdornment,
  TextField,
  Button,
  Paper,
  Tabs,
  Tab,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { format } from 'date-fns';

// Hero section component
const HeroSection = ({ searchQuery, setSearchQuery }) => {
  const router = useRouter();
  
  const handleSearch = (e) => {
    e.preventDefault();
  };
  
  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(135deg, #5D3FD3 0%, #3824A8 100%)',
        color: 'white',
        py: { xs: 6, md: 12 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          Concerts, sports, theater, and more - all in one place
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{
            mb: 4,
            mx: 'auto',
            maxWidth: '800px',
            color: 'rgba(255, 255, 255, 0.8)'
          }}
        >
          Find tickets for your favorite events or sell tickets you can't use.
        </Typography>
        
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            position: 'relative',
            maxWidth: '600px',
            mx: 'auto',
            mb: { xs: 3, md: 0 }
          }}
        >
          <TextField
            fullWidth
            placeholder="Search for events..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { 
                bgcolor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                }
              }
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

// Category tabs component
const CategoryTabs = ({ activeCategory, setActiveCategory, tickets }) => {
  const categoryCounts = {
    all: tickets.length,
    concerts: tickets.filter(ticket => ticket.category === 'concerts').length,
    sports: tickets.filter(ticket => ticket.category === 'sports').length,
    theater: tickets.filter(ticket => ticket.category === 'theater').length,
    conferences: tickets.filter(ticket => ticket.category === 'conferences').length,
  };
  
  return (
    <Box sx={{ width: '100%', bgcolor: '#f8f9fa', py: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)', position: 'relative', zIndex: 1 }}>
      <Container maxWidth="lg" sx={{ mx: 'auto' }}>
        <Tabs 
          value={activeCategory}
          onChange={(e, newValue) => setActiveCategory(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonMobile
          centered
          sx={{
            '& .MuiTabs-flexContainer': {
              justifyContent: 'center',
            },
            '& .MuiTab-root': {
              minWidth: 'auto',
              mx: 1,
              px: 2,
              fontWeight: 500,
              transition: 'all 0.2s',
              '&:hover': {
                color: 'primary.main',
                opacity: 0.8,
              },
            },
            '& .Mui-selected': {
              fontWeight: 600,
            },
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
            }
          }}
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box className="fas fa-star" sx={{ mr: 1 }} component="span" />
                <span>All Events</span>
                {categoryCounts.all > 0 && (
                  <Chip 
                    label={categoryCounts.all} 
                    size="small" 
                    sx={{ ml: 1, bgcolor: 'white', height: 20, minWidth: 28, '& .MuiChip-label': { px: 1, fontSize: '0.675rem' } }} 
                  />
                )}
              </Box>
            } 
            value="all" 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box className="fas fa-music" sx={{ mr: 1 }} component="span" />
                <span>Concerts</span>
                {categoryCounts.concerts > 0 && (
                  <Chip 
                    label={categoryCounts.concerts} 
                    size="small" 
                    sx={{ ml: 1, bgcolor: 'white', height: 20, minWidth: 28, '& .MuiChip-label': { px: 1, fontSize: '0.675rem' } }} 
                  />
                )}
              </Box>
            } 
            value="concerts" 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box className="fas fa-basketball-ball" sx={{ mr: 1 }} component="span" />
                <span>Sports</span>
                {categoryCounts.sports > 0 && (
                  <Chip 
                    label={categoryCounts.sports} 
                    size="small" 
                    sx={{ ml: 1, bgcolor: 'white', height: 20, minWidth: 28, '& .MuiChip-label': { px: 1, fontSize: '0.675rem' } }} 
                  />
                )}
              </Box>
            } 
            value="sports" 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box className="fas fa-theater-masks" sx={{ mr: 1 }} component="span" />
                <span>Theater</span>
                {categoryCounts.theater > 0 && (
                  <Chip 
                    label={categoryCounts.theater} 
                    size="small" 
                    sx={{ ml: 1, bgcolor: 'white', height: 20, minWidth: 28, '& .MuiChip-label': { px: 1, fontSize: '0.675rem' } }} 
                  />
                )}
              </Box>
            } 
            value="theater" 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box className="fas fa-microphone" sx={{ mr: 1 }} component="span" />
                <span>Conferences</span>
                {categoryCounts.conferences > 0 && (
                  <Chip 
                    label={categoryCounts.conferences} 
                    size="small" 
                    sx={{ ml: 1, bgcolor: 'white', height: 20, minWidth: 28, '& .MuiChip-label': { px: 1, fontSize: '0.675rem' } }} 
                  />
                )}
              </Box>
            } 
            value="conferences" 
          />
        </Tabs>
      </Container>
    </Box>
  );
};

// Event card component
const EventCard = ({ ticket }) => {
  // External image URLs based on category
  const categoryImages = {
    concerts: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    sports: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    theater: 'https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    conferences: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  };

  // Default image or category based image
  const imageUrl = ticket.imageUrl || categoryImages[ticket.category] || categoryImages.concerts;
  
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 3 }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={ticket.title}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            bgcolor: ticket.category === 'concerts' ? '#5D3FD3' : 
                     ticket.category === 'sports' ? '#2196f3' :
                     ticket.category === 'theater' ? '#f44336' : '#ff9800',
            color: 'white',
            borderRadius: 1,
            px: 1,
            py: 0.5,
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        >
          {ticket.category ? ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1) : 'Event'}
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          {ticket.title}
        </Typography>
        
        {ticket.date && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
            <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">
              {typeof ticket.date === 'string'
                ? ticket.date
                : format(new Date(ticket.date), 'EEEE, MMMM d, yyyy')}
            </Typography>
          </Box>
        )}
        
        {ticket.location && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
            <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">{ticket.location}</Typography>
          </Box>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="h6" component="p" sx={{ fontWeight: 600, color: '#5D3FD3' }}>
            ${ticket.price.toFixed(2)}
          </Typography>
          <Chip 
            label="Available" 
            size="small" 
            sx={{ bgcolor: '#e8f5e9', color: '#2e7d32' }} 
          />
        </Box>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Link href={`/tickets/${ticket.id}`}>
          <a style={{ textDecoration: 'none' }}>
            <Button 
              variant="outlined" 
              fullWidth
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
      </Box>
    </Card>
  );
};

// Sell your tickets CTA section
const SellTicketsCTA = () => {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        py: 6, 
        px: 4, 
        textAlign: 'center',
        bgcolor: '#f8f9fa',
        borderRadius: 4,
        my: 6
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom fontWeight={600}>
        Ready to sell your tickets?
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
        List your tickets on our platform and reach thousands of potential buyers. 
        Quick, secure, and hassle-free.
      </Typography>
      <Link href="/tickets/new">
        <a style={{ textDecoration: 'none' }}>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              bgcolor: '#5D3FD3',
              '&:hover': {
                bgcolor: '#3824A8'
              }
            }}
          >
            Start Selling
          </Button>
        </a>
      </Link>
    </Paper>
  );
};

// Main component
const LandingPage = ({ currentUser, tickets = [] }) => {
  const router = useRouter();
  const { category: urlCategory } = router.query;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Add category if missing in ticket data
  const processedTickets = tickets.map(ticket => {
    if (!ticket.category) {
      // Assign a default category based on title or other properties if needed
      const title = ticket.title?.toLowerCase() || '';
      if (title.includes('concert') || title.includes('music') || title.includes('festival')) {
        return { ...ticket, category: 'concerts' };
      } else if (title.includes('game') || title.includes('match') || title.includes('championship')) {
        return { ...ticket, category: 'sports' };
      } else if (title.includes('show') || title.includes('play') || title.includes('theatre')) {
        return { ...ticket, category: 'theater' };
      } else if (title.includes('conference') || title.includes('summit') || title.includes('expo')) {
        return { ...ticket, category: 'conferences' };
      } else {
        return { ...ticket, category: 'concerts' }; // Default category
      }
    }
    return ticket;
  });

  // Update active category from URL
  useEffect(() => {
    if (urlCategory && ['all', 'concerts', 'sports', 'theater', 'conferences'].includes(urlCategory)) {
      setActiveCategory(urlCategory);
    }
  }, [urlCategory]);

  // Filter tickets by category and search
  const filteredTickets = processedTickets.filter(ticket => {
    const matchesSearch = searchQuery === "" || 
      (ticket.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
       ticket.location?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === "all" || 
      (ticket.category && ticket.category === activeCategory);
    
    return matchesSearch && matchesCategory;
  });

  // In case we have no tickets
  if (processedTickets.length === 0) {
    return (
      <>
        <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              No tickets available at the moment
            </Typography>
            <Typography variant="body1" paragraph>
              Check back soon for upcoming events or create your own listing.
            </Typography>
            {currentUser && (
              <Link href="/tickets/new">
                <a style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary">
                    Create a Ticket Listing
                  </Button>
                </a>
          </Link>
            )}
          </Paper>
          <SellTicketsCTA />
        </Container>
      </>
    );
  }

  return (
    <>
      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <Box id="events">
        <CategoryTabs 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
          tickets={processedTickets}
        />
        
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {filteredTickets.length > 0 ? (
            <Grid container spacing={3}>
              {filteredTickets.map((ticket) => (
                <Grid item key={ticket.id} xs={12} sm={6} md={4}>
                  <EventCard ticket={ticket} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                No tickets found in this category
              </Typography>
              <Typography variant="body1" paragraph>
                Try another category or create your own listing.
              </Typography>
              {currentUser && (
                <Link href="/tickets/new">
                  <a style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">
                      Create a Ticket Listing
                    </Button>
                  </a>
                </Link>
              )}
            </Paper>
          )}
          
          <SellTicketsCTA />
        </Container>
      </Box>
    </>
  );
};

// Server-side data fetching
export async function getServerSideProps(context) {
  try {
  const client = buildClient(context);
  const { data } = await client.get("/api/tickets");

  return {
    props: {
      tickets: data,
    },
  };
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return {
      props: {
        tickets: [],
      },
    };
  }
}

export default LandingPage;
