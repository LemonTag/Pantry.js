import { useRouteError } from "react-router-dom";
import { Alert, Typography, Box } from '@mui/material'; // Import necessary MUI components

export default function ErrorPage() {
  // Access the error object using useRouteError hook from react-router-dom
  const error = useRouteError();
  console.error(error); // Log the error for debugging purposes

  return (
    <Box sx={{ // Style the container using MUI Box component
      display: 'flex', // Arrange content horizontally
      justifyContent: 'center', // Center content horizontally
      alignItems: 'center', // Center content vertically
      minHeight: '100vh', // Set minimum height to fill the viewport
    }}>
      <Alert severity="error"> // Display an error alert component
        <Typography variant="h1">Oops!</Typography>
        <Typography variant="body1">Sorry, an unexpected error has occurred.</Typography>
        {/* Conditionally display error details if available */}
        {error.statusText && <Typography variant="body2"><i>{error.statusText}</i></Typography>}
        {error.message && <Typography variant="body2"><i>{error.message}</i></Typography>}
      </Alert>
    </Box>
  );
}
