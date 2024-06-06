import { Typography, Box, List } from "@mui/material";
import React from "react";

const UserPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={3}
      mb={3}
    >
      <List>
        <Typography> cedric@email.com </Typography>
        <Typography> moira@email.com </Typography>
        <Typography> user4@email.com </Typography>
      </List>
    </Box>
  );
};

export default UserPage;
