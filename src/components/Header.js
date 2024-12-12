import React from "react";
import { AppBar, Toolbar, Typography, TextField } from "@mui/material";

// Header component that contains the title and search input
const Header = ({ onSearch }) => {
  return (
    <AppBar position="static" sx={{ borderRadius: '8px' , backgroundColor: "#a5d6a7", color: 'black'}} >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          
        }}
      >
         {/* Title of the app */}
        <Typography variant="h6" component="div">
          Gopi Damarla
        </Typography>
        {/* Search field to filter tasks */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search  for tasks"
          sx={{ backgroundColor: "#fff", borderRadius: "7px" }}
          onChange={(e) => onSearch(e.target.value)}// Update search term state on change
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

