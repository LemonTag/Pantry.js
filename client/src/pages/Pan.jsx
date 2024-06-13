import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const PanBase = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
  borderRadius: '50%',
  padding: '30px',
  width: '200px',
  height: '200px',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer', // Optional for hover effect
});

const PanTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  textAlign: 'center',
});

const Pan = ({ title, children, onClick }) => {
  return (
    <PanBase onClick={onClick}>
      <PanTitle variant="h6" component="div">
        {title}
      </PanTitle>
      {children}
    </PanBase>
  );
};

export default Pan;
