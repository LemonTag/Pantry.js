import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Grid, Tabs, Tab } from '@mui/material';


const NavTabs = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);
  const [bounceTab, setBounceTab] = useState(null);

  useEffect(() => {
    localStorage.setItem('page', currentPage)
  
    if (bounceTab) {
      const timer = setTimeout(() => {
        setBounceTab(null);
      }, 500); // Duration should match the animation duration

      return () => clearTimeout(timer);
    }
  }, [bounceTab]);

  const handleChange = (event, newValue) => {
    setCurrentPage(newValue);
    setBounceTab(newValue);

  };

  const tabStyles = {
    borderRadius: '10px 10px 0 0',  // Rounded corners
    backgroundColor: '#425263',  // Background color for inactive tabs
    marginRight: '50px',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)', // Add box shadow
    backgroundColor: '#DADADA',  // Background color for active tab
    color: '#224E9C',  // Text color for active tab.
    minWidth: '100px',
    '&.Mui-selected': {
      backgroundColor: "#5DBB63",
    },
  };

  const tabsContainerStyles = {
    marginTop: '15px',
    marginBottom: '-16px', // Adjust as needed to remove space below tabs
  };

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Tabs
          value={currentPage}
          onChange={
            handleChange
          }
          indicatorColor="primary"
          textColor="primary"
          sx={tabsContainerStyles}
        >
          <Tab
            label="Home"
            value="/"
            component={Link}
            to="/"
            className={currentPage === "/" ? "nav-link active" : "nav-link"}
            sx={tabStyles}
            classes={{ root: bounceTab === "/" ? 'bounce' : '' }}
          />
          <Tab
            label="Pantry"
            value="/Pantry"
            component={Link}
            to="/Pantry"
            className={currentPage === "/Pantry" ? "nav-link active" : "nav-link"}
            sx={tabStyles}
            classes={{ root: bounceTab === "/Pantry" ? 'bounce' : '' }}
          />
          <Tab
            label="Cook Book"
            value="/Cookbook"
            component={Link}
            to="/Cookbook"
            className={currentPage === "/Cookbook" ? "nav-link active" : "nav-link"}
            sx={tabStyles}
            classes={{ root: bounceTab === "/Cookbook" ? 'bounce' : '' }}
          />
        </Tabs>
      </Grid>
    </Grid>
  );
};

export default NavTabs;
