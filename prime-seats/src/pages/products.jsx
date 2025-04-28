import React from "react";
import { Card, CardContent, Typography, CardMedia, Grid, Button } from "@mui/material";

const events = [
    {
      id: 1,
      name: "Concerts",
      description: "Book premium seats for live concerts happening near you.",
      image: "https://media.istockphoto.com/id/1461816749/photo/a-crowd-of-people-with-raised-arms-during-a-music-concert-with-an-amazing-light-show-black.jpg?s=612x612&w=0&k=20&c=-hdWCLDP5AI9A3mjq3JPMPKhXxJ2P1iItPDFktQHxX8=",
    },
    {
      id: 2,
      name: "Sports",
      description: "Catch the thrill of live sports with the best seats in the house.",
      image: "https://t3.ftcdn.net/jpg/02/78/42/76/360_F_278427683_zeS9ihPAO61QhHqdU1fOaPk2UClfgPcW.jpg",
    },
    {
      id: 3,
      name: "Theatre",
      description: "Experience world-class plays and musicals with exclusive seating options.",
      image: "https://t3.ftcdn.net/jpg/03/74/28/58/240_F_374285858_KzJ88FysqJ79AhyNPW2lqnBtsRTokuav.jpg",
    },
    {
      id: 4,
      name: "Festivals",
      description: "Reserve your spot at popular festivals and cultural events.",
      image: "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?cs=srgb&dl=pexels-marcin-dampc-807808-1684187.jpg&fm=jpg",
    },
  ];

export default function Products() {
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Explore Our Events
      </Typography>
      <Grid container spacing={4}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={event.image}
                alt={event.name}
              />
              <CardContent>
                <Typography variant="h6">{event.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                  href={`/products/${event.id}`}
                  sx={{backgroundColor:'#ff6347'}}
                >
                  View Seats
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
