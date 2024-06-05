import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import { addItem, fetchItems, updateItem } from "../store/itemSlice";
import ItemFormDialog from "../components/ItemFormDialog";
import { addItemToCart } from "../store/orderSlice";
import Cart from "../components/Cart";
import { getAStoreItem } from "../utils/api";
import GlobalSpinner from "../components/GlobalSpinner";

const ItemsPage = () => {
  const { storeId } = useParams();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.items);
  const itemStatus = useSelector((state) => state.item.status);
  const itemError = useSelector((state) => state.item.error);
  const user = useSelector((state) => state.user.user);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [addItemError, setAddItemError] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchItems(storeId));
  }, [dispatch, storeId]);

  const handleOpenDialog = (item = null) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };

  const handleQuantityChange = (itemId, value) => {
    setQuantities((prevState) => ({
      ...prevState,
      [itemId]: value,
    }));
  };

  const handleAddToOrder = async (itemId) => {
    const quantity = quantities[itemId];
    if (quantity > 0) {
      try {
        const token = localStorage.getItem("token");
        const response = await getAStoreItem(itemId, token);
        const itemName = response.data.name;
        dispatch(addItemToCart({ itemId, itemName, quantity }));
      } catch (error) {
        setAddItemError(`Failed to add item to cart ${error.message}`);
        setAlertOpen(true);
        setTimeout(() => setAlertOpen(false), 5000);
      }
    }
  };

  const handleSubmit = (itemData) => {
    if (selectedItem) {
      dispatch(updateItem({ ...selectedItem, ...itemData, storeId }));
    } else {
      dispatch(addItem({ ...itemData, storeId }));
    }
  };

  if (itemStatus === "loading") {
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

  if (itemStatus === "failed") {
    return (
      <Snackbar
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        autoHideDuration={50000}
      >
        <Alert severity="error">{itemError}</Alert>
      </Snackbar>
    );
  }

  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    mt={3}
    mb={3}
  >
    <List>
      {user.role === "ADMIN" && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Create Item
        </Button>
      )}
      <Typography variant="h4">Items not found</Typography>
      <ItemFormDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        item={selectedItem}
      />
    </List>
  </Box>;

  // TODO Item Dialog not working.

  return (
    <Container>
      <Box justifyContent="center" alignItems="center" mt={3} mb={3}>
        <List>
          {user.role === "ADMIN" && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenDialog()}
            >
              Create Item
            </Button>
          )}

          <Button
            variant="contained"
            color="secondary"
            onClick={() => setCartOpen(!cartOpen)}
          >
            {cartOpen ? "Hide Cart" : "View Cart"}
          </Button>
        </List>
        {cartOpen && (
          <Container>
            <Cart storeId={storeId} />
          </Container>
        )}

        <List>
          {items.map((item) => (
            <ListItem key={item.id}>
              <ListItemButton onClick={() => handleOpenDialog(item)}>
                <ListItemText
                  primary={item.name}
                  secondary={`Price: UGX ${item.price}`}
                />
              </ListItemButton>
              <div>
                <TextField
                  type="number"
                  label="Quantity"
                  value={quantities[item.id] || 0}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value, 10))
                  }
                  style={{ marginRight: "1em" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToOrder(item.id)}
                >
                  Add to Order
                </Button>
              </div>
            </ListItem>
          ))}
        </List>
        {addItemError && (
          <Snackbar
            open={alertOpen}
            onClose={() => setAlertOpen(false)}
            autoHideDuration={5000}
          >
            <Alert severity="error">{addItemError}</Alert>
          </Snackbar>
        )}
        {itemError && (
          <Snackbar
            open={alertOpen}
            onClose={() => setAlertOpen(false)}
            autoHideDuration={5000}
          >
            <Alert severity="error">{itemError}</Alert>
          </Snackbar>
        )}
        <ItemFormDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          onSubmit={handleSubmit}
          item={selectedItem}
        />
      </Box>
    </Container>
  );
};

export default ItemsPage;
