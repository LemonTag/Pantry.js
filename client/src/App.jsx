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
  return (
    <ApolloProvider client={client}>
      <Box sx={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        background: "#FFE4B5",
        backgroundImage: `url("https://as2.ftcdn.net/v2/jpg/08/16/22/81/1000_F_816228114_BQsMoU6mKBjkWqvz3cuZZaP6x7iTcaA7.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '101%',
      }}>
        <Header />
        <Container sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1,  backgroundColor: 'hsla(0, 0%, 100%, 0.455)'}}>
          <div className='test'>
          <Outlet />
          </div>
        </Container>
      <Footer />
      </Box>
    </ApolloProvider>
  );
}


export default App;