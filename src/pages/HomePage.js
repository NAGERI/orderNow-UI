// src/pages/HomePage.js
import { Container, Typography, Box, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <>
      <Container maxWidth="md">
        <Box mt={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Order Now
          </Typography>
        </Box>
        <Box mt={2}>
          <Button color="inherit" onClick={() => handleNavigation("/stores")}>
            Restaurants
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
