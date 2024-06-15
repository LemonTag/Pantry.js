import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Container, Typography, Button, Box } from "@mui/material";
import NavTabs from './navTabs'; // Assuming NavTabs is converted to MUI as well
import logo from '../../assets/logo.png'

import Auth from "../../utils/auth";

const Header = () => {
  const currentPage = useLocation().pathname;
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <AppBar position="static" sx={{background: '#DDf2D1'}}className="text-light mb-4 py-3"> {/* Set background color and classes */}
      <Container sx={{minWidth: '100vw', maxWidth: '100vw'}}> {/* Set container width */}
        <Toolbar disableGutters> {/* Remove default padding */}
          <Box display="flex" flexGrow={1} flexDirection="column"> {/* Box for left section with flexbox layout */}
            <Link to="/" style={{ textDecoration: 'none' }}> {/* Link component for logo */}
              <Typography display = "flex" variant="h6" noWrap component="div" 
              sx={{    color: '#5DBB63',
                fontWeight: 'bold',
                fontSize: '25px',
                paddingRight: '10px',
                justifyContent: "space-between",
                fontFamily: 'Rubik Mono One, monospace;',
                }}>
                <img src={logo} alt="" style={{ width: '210px', height: '160px' }} />
              </Typography>
            </Link>
           
          </Box>
          <Box display="flex"> {/* Box for right section with flexbox layout */}
            {Auth.loggedIn() ? (
              <> {/* Render buttons if user is logged in */}
                <Button variant="contained" color="primary" to="/me" component={Link} sx={{ mr: 1,fontFamily: 'Concert One, sans-serif' }}>
                  {Auth.getProfile().data.username}'s profile
                </Button>
                <Button variant="outlined" onClick={logout} sx={{ mr: 1, fontFamily: 'Concert One, sans-serif' }}>
                  Logout
                </Button>
              </>
            ) : (
              <> {/* Render buttons if user is not logged in */}
                <Button variant="contained" color="primary" to="/login" component={Link} sx={{ mr: 1, background: '#5DBB63', boxShadow: 2, fontFamily: 'Concert One, sans-serif'}}>
                  Login
                </Button>
                <Button variant="outlined" to="/signup" component={Link} sx={{ mr: 1, background: 'white', boxShadow: 2, fontFamily: 'Concert One, sans-serif'}}>
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
