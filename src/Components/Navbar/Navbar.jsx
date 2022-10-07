import React, { useState } from "react";
import {AppBar, Box, Typography, Toolbar, Button, Divider, IconButton, Drawer} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import { Link  } from "react-router-dom";
import styled from "@mui/material/styles/styled";

const StyledButton = styled(Button)(() => ({
   color: "#393D47",  
   width: '100%',
   margin: 'auto',
   '&:hover': { backgroundColor: '#393D47', color: '#f1f1f1', borderRadius: 0 }
}));


const Navbar = (props) => {
  // Open Drawer
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  // Drawer Component
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        width: "200px",
        background:
          "Radial-gradient(343px at 46.3% 47.5%, rgb(242, 242, 242) 0%, rgb(241, 241, 241) 72.9%)",
        height: "100vh",
        overflowY: 'hidden'
      }}
    >
      <Box sx={{height: "100vh"}}>
      <StyledButton component={Link} to="/">
        <Typography sx={{padding: '41vh  25px 25px 25px',}}  fontWeight="Bold">
          Current
        </Typography>
      </StyledButton>
      <StyledButton sx={{padding: ' 25px 25px 50vh 25px',}}component={Link} to="/historic">
        <Typography fontWeight="Bold">
          Historic
        </Typography>
      </StyledButton>
      </Box>
    </Box>
  );

  return (
    // Navbar
    <Box>
      <AppBar position="fixed" elevation={0} sx={{background: 'transparent'}}>
        <Toolbar>
          <IconButton
            sx={{color: 'black',  mr: 2 }}
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box >
        <Drawer
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{keepMounted: true }}>
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
