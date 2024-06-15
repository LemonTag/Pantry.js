import { Container, Typography, } from '@mui/material';
import {useEffect, useState} from 'react'
import '../App.css';
import Video from "../Video/0614.mp4"
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
    <div>
     <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            left: "50%",
            top: "50%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            zIndex: "-1"
          }}
        >
          <source src={Video} type="video/mp4" />
        </video>
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
      <Typography variant="body1" sx={{ color: 'white', fontFamily: '"Concert One", sans-serif;', fontSize:"30px"}}>
        "There's food at home"
      </Typography>
    </Container>
    </div>
  );
};

export default Home;
