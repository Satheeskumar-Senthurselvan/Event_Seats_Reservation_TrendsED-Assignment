import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Testimonial from '../components/ testimonial';
import FeaturedCard from '../components/featuredCard';
import HeroSection from '../components/heroSection';
import user2 from '../assets/user2.avif';

const featuredData = [
  { id: 1, title: "Featured Event", description: "Join us for an exclusive experience", image: "https://images.unsplash.com/photo-1480455454781-1af590be2a58?q=80&w=2940&auto=format&fit=crop", date: "2024-12-01", location: "New York", category: "Concerts" },
  { id: 2, title: "VIP Seating", description: "Get the best seats in the house", image: "https://images.unsplash.com/photo-1480455454781-1af590be2a58?q=80&w=2940&auto=format&fit=crop", date: "2024-12-15", location: "Los Angeles", category: "Theater" },
  { id: 3, title: "Sports Night", description: "Cheer for your favorite team!", image: "https://images.unsplash.com/photo-1480455454781-1af590be2a58?q=80&w=2940&auto=format&fit=crop", date: "2024-11-20", location: "Chicago", category: "Sports" },
  { id: 4, title: "Theater Showcase", description: "Experience an amazing play", image: "https://images.unsplash.com/photo-1480455454781-1af590be2a58?q=80&w=2940&auto=format&fit=crop", date: "2024-11-25", location: "New York", category: "Theater" },
];

const testimonialData = [
  { name: "John Doe", image: "https://images.unsplash.com/photo-1480455454781-1af590be2a58?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3", quote: "Amazing experience!" },
  { name: "Jane Smith", image: "https://images.unsplash.com/photo-1480455454781-1af590be2a58?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3", quote: "Best seats ever!" },
  { name: "Michael Brown", image: user2, quote: "Unforgettable moments!" },
];

export default function Home() {
  const [filters, setFilters] = useState({
    search: "",
    date: "",
    location: "",
    category: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredData = featuredData.filter((event) => {
    const matchesSearch = filters.search
      ? event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.search.toLowerCase())
      : true;
    const matchesDate = filters.date ? event.date === filters.date : true;
    const matchesLocation = filters.location ? event.location === filters.location : true;
    const matchesCategory = filters.category ? event.category === filters.category : true;

    return matchesSearch && matchesDate && matchesLocation && matchesCategory;
  });

  return (
    <div>
      <HeroSection />
      <Container>
        {/* Filters Section */}
        <Box display="flex" flexWrap="wrap" gap={2} mb={4} mt={4}>
          <TextField
            label="Search"
            variant="outlined"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            sx={{ flex: 1, minWidth: 200 }}
          />
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            sx={{ flex: 1, minWidth: 150 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Location"
            select
            variant="outlined"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            sx={{ flex: 1, minWidth: 150 }}
          >
            <MenuItem value="">All Locations</MenuItem>
            <MenuItem value="New York">New York</MenuItem>
            <MenuItem value="Los Angeles">Los Angeles</MenuItem>
            <MenuItem value="Chicago">Chicago</MenuItem>
          </TextField>
          <TextField
            label="Category"
            select
            variant="outlined"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            sx={{ flex: 1, minWidth: 150 }}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="Concerts">Concerts</MenuItem>
            <MenuItem value="Theater">Theater</MenuItem>
            <MenuItem value="Sports">Sports</MenuItem>
          </TextField>
        </Box>

        {/* Featured Events */}
        <Box mt={4}>
          <Typography variant="h4" align="center" gutterBottom>
            Featured Events
          </Typography>
          <Box display="flex" justifyContent="space-around" flexWrap="wrap" mt={4}>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <FeaturedCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                />
              ))
            ) : (
              <Typography variant="h6" align="center" color="textSecondary">
                No events found matching the filters.
              </Typography>
            )}
          </Box>
        </Box>

        {/* Testimonials */}
        <Box mt={8} mb={8}>
          <Typography variant="h4" align="center" gutterBottom>
            What Our Customers Say
          </Typography>
          <Box display="flex" justifyContent="space-around" flexWrap="wrap">
            {testimonialData.map((item) => (
              <Testimonial key={`${item.name}-${item.quote}`} {...item} />
            ))}
          </Box>
        </Box>
      </Container>
    </div>
  );
}
