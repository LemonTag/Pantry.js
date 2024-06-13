import { Container, Typography, } from '@mui/material';

// Home component representing the main page of the application
const Home = () => {
  return (
    <Container 
      maxWidth="md" 
      style={{ 
        
      }}
    >
      {/* Display the main text content using a Typography component with body1 variant */}
      <Typography variant="body1">
        Thar be the home page, host of hopes, dreams, and hopefully eventually some food n shit lmao
      </Typography>
    </Container>
  );
};

export default Home;
