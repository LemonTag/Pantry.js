import { Container, Typography, Box } from '@mui/material';
import PantryList from '../components/PantryList/PantryList'; // Assuming PantryList is a valid component

export default function Pantry() {
  return (
    <Container maxWidth="md"> {/* Container for responsive layout */}
      <Box sx={{ mb: 4 }}> {/* Box for spacing between title and list */}
        <Typography variant="h1">Pantry</Typography> {/* Page title */}
        <Typography variant="body1">This is the pantry page.</Typography> {/* Descriptive text */}
      </Box>
      <Box> {/* Box for the pantry list section */}
        <Typography variant="body2">
          Soon it shall map over a list of objects from PantryList/PantryList.jsx
        </Typography> {/* Placeholder text for future functionality */}
        <PantryList /> {/* Render the PantryList component */}
      </Box>
    </Container>
  );
}
