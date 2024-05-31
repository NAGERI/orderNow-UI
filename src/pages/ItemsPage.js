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
  Typography,
  TextField,
} from "@mui/material";
import { addItem, fetchItems, updateItem } from "../store/itemSlice";
import ItemFormDialog from "../components/ItemFormDialog";
import { addItemToCart } from "../store/orderSlice";
import Cart from "../components/Cart";

const ItemsPage = () => {
  const { storeId } = useParams();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.items);
  const user = useSelector((state) => state.user.user);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

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

  const handleAddToOrder = (itemId) => {
    const quantity = quantities[itemId];
    if (quantity > 0) {
      dispatch(addItemToCart({ itemId, quantity }));
    }
  };

  const handleSubmit = (itemData) => {
    if (selectedItem) {
      dispatch(updateItem({ ...selectedItem, ...itemData, storeId }));
    } else {
      dispatch(addItem(...itemData, storeId));
    }
  };

  if (items.length <= 0) {
    return (
      <Container>
        <List>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={3}
            mb={3}
          >
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
          </Box>
          <ItemFormDialog
            open={dialogOpen}
            handleClose={handleCloseDialog}
            item={selectedItem}
            onSubmit={handleSubmit}
          />
        </List>
      </Container>
    );
  }

  return (
    <Container>
      <Box alignItems="center" mt={3} mb={3}>
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
                  datatype="number"
                  value={quantities[item.id] || ""}
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
        <ItemFormDialog
          open={dialogOpen}
          handleClose={handleCloseDialog}
          onSubmit={handleSubmit}
          item={selectedItem}
        />
      </Box>
    </Container>
  );
};

export default ItemsPage;
