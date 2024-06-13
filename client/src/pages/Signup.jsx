import React, { useState } from 'react'; // Hook for managing component state
import { Link as RouterLink } from 'react-router-dom'; // Link component for navigation within React Router
import { useMutation } from '@apollo/client'; // Hook for interacting with GraphQL mutations
import { useForm, Controller } from 'react-hook-form'; // Hook for managing form state and validation
import * as Yup from 'yup'; // Library for schema validation
import { yupResolver } from '@hookform/resolvers/yup'; // Resolver for integrating Yup with react-hook-form

import { ADD_USER } from '../utils/mutations'; // Import the ADD_USER mutation definition
import Auth from '../utils/auth'; // Utility functions for user authentication

import {
  Button, // MUI component for buttons
  Card, // MUI component for card layout
  CardContent, // MUI component for card content area
  CardHeader, // MUI component for card header
  Typography, // MUI component for styled text
  FormControl, // MUI component for form controls
  InputLabel, // MUI component for input labels
  OutlinedInput, // MUI component for outlined input fields
  FormHelperText, // MUI component for helper text
  Box, // MUI component for layout and styling
  Link, // MUI component for links
  Alert, // MUI component for displaying alerts
} from '@mui/material';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Signup = () => {
  // State to manage signup form data (username, email, password)
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Mutation hook for signup using ADD_USER mutation
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // Hook form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const { data } = await addUser({ variables: { ...formData } });
      Auth.login(data.addUser.token); // Login user after successful signup
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box className="flex-row justify-center mb-4"> {/* Container for signup form layout (likely using CSS classes) */}
      <Card sx={{ width: '100%', maxWidth: 500 }}> {/* Card component for signup form */}
        <CardHeader title="Sign Up" /> {/* Card header with title */}
        <CardContent> {/* Content area of the card */}
          {data ? (
            <Alert severity="success"> {/* Success message after successful signup */}
              Success! You may now head <Link component={RouterLink} to="/">back to the homepage.</Link>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}> {/* Form for signup */}
              <FormControl fullWidth sx={{ mb: 2 }}> {/* Username field */}
                <InputLabel htmlFor="username">Username</InputLabel>
                <OutlinedInput
                  id="username"
                  {...register('username')}
                  error={!!errors.username}
                  label="Username"
                />
                <FormHelperText sx={{ color: 'error.main' }}>
                  {errors.username && errors.username.message} {/* Display validation error for username */}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}> {/* Email field */}
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  {...register('email')}
                  error={!!errors.email}
                  label="Email"
                />
                <FormHelperText sx={{ color: 'error.main' }}>
                  {errors.email && errors.email.message} {/* Display validation error for email */}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}> {/* Password field */}
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type="password"
                  {...register('password')}
                  error={!!errors.password}
                  label="Password"
                />
                <FormHelperText sx={{ color: 'error.main' }}>
                  {errors.password && errors.password.message} {/* Display validation error for password */}
                </FormHelperText>
              </FormControl>
              <Button type="submit" variant="contained" sx={{ width: '100%' }}>
                Submit
              </Button>
            </form>
          )}
          {error && (
            <Alert severity="error">{error.message}</Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
