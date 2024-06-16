import { Container, Typography, Box, Grid } from '@mui/material';
import PantryInput from '../components/Pantry/AddFood';
import PantryList from '../components/Pantry/PantryList';

export default function Pantry() {
  return (
    <Container  className="cp" id="pantry" maxWidth="md">
      <Grid container spacing={4}> {/* Grid container for layout */}
        <Grid item xs={12} md={8}> {/* Grid item for title and input */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h1" sx ={{color:'#001F3F', fontFamily: '"Concert One", sans-serif'}}>Welcome Chef, </Typography>
            
          </Box>
          <Box>
           
            <PantryInput />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}> {/* Grid item for pantry list */}
          <PantryList />
        </Grid>
      </Grid>
    </Container>
  );
}
