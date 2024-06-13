import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Container, Typography, Button, Box } from "@mui/material";
import NavTabs from './navTabs'; // Assuming NavTabs is converted to MUI as well

import Auth from "../../utils/auth";

const Header = () => {
  const currentPage = useLocation().pathname;
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <AppBar position="static" sx={{background: '#DDf2D1'}}className="text-light mb-4 py-3"> {/* Set background color and classes */}
      <Container maxWidth="lg"> {/* Set container width */}
        <Toolbar disableGutters> {/* Remove default padding */}
          <Box display="flex" flexGrow={1} alignItems="center"> {/* Box for left section with flexbox layout */}
            <Link to="/" style={{ textDecoration: 'none' }}> {/* Link component for logo */}
              <Typography display = "flex" variant="h6" noWrap component="div" sx={{ color: 'inherit', fontStyle: 'italic', fontSize: '25px', paddingRight: '10px', justifyContent: "space-between",   }}>
                Pantry.js
              </Typography>
            </Link>
            <Typography variant="body2" noWrap component="p" sx={{ ml: 1, color:'black', display: { xs: 'none', md: 'flex' } }}>
              what's in your fridge? 
            </Typography>
          </Box>
          <Box display="flex"> {/* Box for right section with flexbox layout */}
            {Auth.loggedIn() ? (
              <> {/* Render buttons if user is logged in */}
                <Button variant="contained" color="primary" to="/me" component={Link} sx={{ mr: 1 }}>
                  {Auth.getProfile().data.username}'s profile
                </Button>
                <Button variant="outlined" onClick={logout} sx={{ mr: 1 }}>
                  Logout
                </Button>
              </>
            ) : (
              <> {/* Render buttons if user is not logged in */}
                <Button variant="contained" color="primary" to="/login" component={Link} sx={{ mr: 1, boxShadow: 2, }}>
                  Login
                </Button>
                <Button variant="outlined" to="/signup" component={Link} sx={{ mr: 1, background: 'white', boxShadow: 2,}}>
                  Signup
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
      <NavTabs /> {/* Render the NavTabs component */}
    </AppBar>
  );
};

export default Header;
