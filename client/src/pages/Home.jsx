import { Container, Typography, } from '@mui/material';
import {useEffect, useState} from 'react'
import '../App.css';
// Home component representing the main page of the application
const Home = () => {
const [animate, setAnimate] = useState(false);

useEffect(() => {
  //set animate to true a short delay to trigger the animation
  setTimeout(() => {
    setAnimate(true);
  }, 100);
}, []); //Run once on component mount

  return (
    
    <Container 
      maxWidth="md" 
      sx={{  
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        textAlign: 'center', // Center align the text
        alignItems: 'center',
        minHeight: '80vh',
       
        fontWeight: 'bold',
        fontFamily: '"Rubik Mono One", monospace;',
        }}>
        <Typography
        variant='h8'
        component="div"
        id="home"
        className={animate ? 'animate-pop-up cp': 'cp'}
        sx={{
          mb: 2, //Margin bottom for spacing
          color: '#5DBB63 !important', // Use !important to force override
          fontSize: '100px'
        }}
        >
        Pantry.js
        </Typography>
    
      {/* Display the main text content using a Typography component with body1 variant */}
      <Typography variant="body1" sx={{ color: 'white'}}>
        Thar be the home page, host of hopes, dreams, and hopefully eventually some food n shit lmao
      </Typography>
    </Container>
  );
};

export default Home;
