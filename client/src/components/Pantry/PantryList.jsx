import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Button,
  Container,
  Typography,
  Grid,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_INGREDIENTS } from "../../utils/queries";
import { DELETE_INGREDIENT, UPDATE_INGREDIENT } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";
import AuthService from "../../utils/auth";
import SearchModal from "./SearchModal";

const PantryList = () => {
  const { loading, error, data } = useQuery(GET_ALL_INGREDIENTS);
  const [updateIngredient] = useMutation(UPDATE_INGREDIENT, {
    refetchQueries: [{ query: GET_ALL_INGREDIENTS }],
  });

  const [deleteIngredient] = useMutation(DELETE_INGREDIENT, {
    update(cache, { data: { deleteIngredient } }) {
      const { getAllIngredients } = cache.readQuery({
        query: GET_ALL_INGREDIENTS,
      });
      const updatedIngredients = getAllIngredients.filter(
        (ingredient) => ingredient._id !== deleteIngredient._id
      );
      cache.writeQuery({
        query: GET_ALL_INGREDIENTS,
        data: {
          getAllIngredients: updatedIngredients,
        },
      });
    },
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [editedIngredient, setEditedIngredient] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentIngredientId, setCurrentIngredientId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(AuthService.loggedIn());
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleToggle = (id) => {
    const currentIndex = selectedIngredients.indexOf(id);
    const newSelected = [...selectedIngredients];

    if (currentIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelectedIngredients(newSelected);
  };

  const handleSearch = async () => {
    try {
      if (AuthService) {
        const isLoggedIn = AuthService.loggedIn();
        if (!isLoggedIn) {
          setErrorMessage("Must be logged in");
          return;
        }
      } else {
        console.error("AuthService is not defined.");
        setErrorMessage("Authentication service is not available.");
        return;
      }

      const selectedIngredientNames = data.getAllIngredients
        .filter((ingredient) => selectedIngredients.includes(ingredient._id))
        .map((ingredient) => ingredient.food);

      if (selectedIngredientNames.length === 0) {
        setErrorMessage("Select at least one ingredient to search.");
        return;
      }

      const queryString = selectedIngredientNames.join("+");

      const response = await fetch(
        `https://api.edamam.com/search?q=${queryString}&app_id=e60d45ac&app_key=fcb5780894c4282cc330af20f9a037df`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipes from Edamam");
      }

      const responseData = await response.json();
      const recipes = responseData.hits.map((hit) => hit.recipe);
      setSearchResults(recipes);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setErrorMessage("Failed to fetch recipes");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSearchResults([]);
  };

  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentIngredientId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentIngredientId(null);
  };

  const handleDelete = async () => {
    try {
      await deleteIngredient({ variables: { _id: currentIngredientId } });
      handleMenuClose();
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  const handleOpenDialog = (id) => {
    const ingredient = data.getAllIngredients.find((ing) => ing._id === id);
    if (ingredient) {
      setEditedIngredient(ingredient);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditedIngredient(null);
  };

  const handleUpdateIngredient = async () => {
    try {
      await updateIngredient({
        variables: {
          _id: editedIngredient._id,
          food: editedIngredient.food,
          quantity: parseInt(editedIngredient.quantity),
          measure: editedIngredient.measure,
        },
      });
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating ingredient:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedIngredient({
      ...editedIngredient,
      [name]: value,
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" sx={{ mt: 4, mb: 2, color: "#001F3F" }}>
        Your Pantry
      </Typography>
      <Grid container spacing={0}>
        {data.getAllIngredients.map((ingredient) => (
          <Grid item xs={12} key={ingredient._id}>
            <ListItem
              onClick={() => handleOpenDialog(ingredient._id)}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(240, 240, 240, 0.5)",
                },
                mb: 2,
                cursor: "pointer",
                listStyleType: "none",
              }}
            >
              <ListItemText
                primary={ingredient.food}
                secondary={`Quantity: ${ingredient.quantity || ""} ${
                  ingredient.measure || ""
                }`}
                primaryTypographyProps={{ sx: { color: "#001F3F" } }}
                secondaryTypographyProps={{ sx: { color: "#001F3F" } }}
              />
              <ListItemSecondaryAction
                sx={{ paddingRight: '20px', '& > *': { listStyle: 'none' } }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        selectedIngredients.indexOf(ingredient._id) !== -1
                      }
                      onChange={() => handleToggle(ingredient._id)}
                    />
                  }
                />
                <IconButton
                  onClick={(event) => handleMenuClick(event, ingredient._id)}
                >
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleOpenDialog(ingredient._id)}>
                Update
              </MenuItem>
              <MenuItem onClick={() => handleDelete(ingredient._id)}>
                Delete
              </MenuItem>
            </Menu>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{ mt: 2, background: "#425263" }}
      >
        Search
      </Button>
      <SearchModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        searchResults={searchResults}
      />
      {errorMessage && <p>{errorMessage}</p>}
      {editedIngredient && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Update Ingredient</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="food"
              label="Food"
              type="text"
              fullWidth
              value={editedIngredient.food || ""}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="quantity"
              label="Quantity"
              type="number"
              fullWidth
              value={editedIngredient.quantity || ""}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="measure"
              label="Measure"
              type="text"
              fullWidth
              value={editedIngredient.measure || ""}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdateIngredient} color="primary">
              Save Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default PantryList;
