import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container, Box, } from '@mui/material';
import { useState, useEffect } from 'react';
import image from '../src/assets/bg.jpg'
import { ThemeProvider } from '@mui/material/styles';
import theme from './themes/theme'

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});



// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [cP, setcP] = useState(localStorage.getItem('page') + "1");
  useEffect(() => {
    const checkLocalStorage = () => {
      const storedPage = localStorage.getItem('page') + "1"
      if (storedPage !== cP) {
        setcP(storedPage)
      }
    }
    const intervalId = setInterval(checkLocalStorage, 1000);
    return () => clearInterval(intervalId);
  }, [cP])
  console.log(cP)
  return (
    <ApolloProvider client={client}>
       <ThemeProvider theme={theme}>
        <Box sx={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          backgroundImage: cP === '/1'
            ? 'none !important' : `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '101%',
          backgroundBlendMode: 'multiply', // Optional: Adjust background blending for better contrast
          backgroundColor: cP === '/1'
            ? 'transparent'
            : 'rgba(255, 255, 255, 0.7)', // Set background color with opacity based on page
        }}>
          <Header />
          <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            backgroundColor: cP === '/1'
            ? 'transparent'
            : 'inherit',
            overflowY: 'auto',
            height: 'calc(100vh - 64px)'
          }}>
            <div className='test'>
              <Outlet />
            </div>
          </Container>
         <Footer />
        </Box>
      </ThemeProvider>
     </ApolloProvider>
  );
}


export default App;