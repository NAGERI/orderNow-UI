import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addStore, fetchStores, updateStoreSlice } from "../store/storeSlice";
import {
  Container,
  List,
  Typography,
  Box,
  Button,
  ListItem,
  IconButton,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Alert,
} from "@mui/material";
import StoreFormDialog from "../components/StoreFormDialog";
import EditIcon from "@mui/icons-material/Edit";
import GlobalSpinner from "../components/GlobalSpinner";

const StorePage = () => {
  const { storeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stores = useSelector((state) => state.store.stores);
  const user = useSelector((state) => state.user.user);
  const storeStatus = useSelector((state) => state.store.status);
  const storeError = useSelector((state) => state.store.error);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch, storeId]);

  const handleOpenDialog = (store = null) => {
    setSelectedStore(store);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedStore(null);
  };

  const handleSubmit = (storeData) => {
    if (selectedStore) {
      dispatch(updateStoreSlice({ ...selectedStore, ...storeData }));
    } else {
      dispatch(addStore(storeData));
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };
  if (stores.length <= 0) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
          mb={3}
        >
          <List>
            {user && user.role === "ADMIN" && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenDialog()}
              >
                Add Restaurant
              </Button>
            )}
            <Typography variant="h4">Restaurants not found</Typography>
            <StoreFormDialog
              open={dialogOpen}
              onClose={handleCloseDialog}
              onSubmit={handleSubmit}
              store={selectedStore}
            />
          </List>
        </Box>
      </Container>
    );
  }

  if (storeStatus === "loading") {
    return (
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <GlobalSpinner />
        </div>
      </Container>
    );
  }

  if (storeStatus === "failed") {
    return <Alert severity="error">{storeError}</Alert>;
  }

  return (
    <>
      <Container>
        <Box alignItems="center" mt={3} mb={3}>
          {user && user.role === "ADMIN" && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenDialog()}
            >
              Add Restaurant
            </Button>
          )}
          <List>
            {stores.map((store) => (
              <ListItem key={store.id} divider>
                <ListItemButton
                  onClick={() => handleNavigation(`/stores/${store.id}/items`)}
                >
                  <ListItemText
                    primary={store.name}
                    secondary={store.description}
                  />
                </ListItemButton>
                <ListItemIcon onClick={() => handleOpenDialog(store)}>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
          <StoreFormDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            onSubmit={handleSubmit}
            store={selectedStore}
          />
        </Box>
      </Container>
    </>
  );
};

export default StorePage;
