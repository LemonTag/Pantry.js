import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';

const NavTabs = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);

  const handleChange = (event, newValue) => {
    setCurrentPage(newValue);
  };

  return (
    <Tabs value={currentPage} onChange={handleChange} indicatorColor="primary" textColor="primary">
      <Tab 
        label="Home" 
        value="/" 
        component={Link} 
        to="/" 
        className={currentPage === "/" ? "nav-link active" : "nav-link"} 
      />
      <Tab 
        label="Pantry" 
        value="/Pantry" 
        component={Link} 
        to="/Pantry" 
        className={currentPage === "/Pantry" ? "nav-link active" : "nav-link"} 
      />
      <Tab
      label="Cook Book"
      value="/Cookbook"
      component={Link}
      to="/Cookbook"
      className={currentPage === "/Cookbook" ? "nav-link active" : "nav-link"} 
      />
    </Tabs>
  );
};

export default NavTabs;
