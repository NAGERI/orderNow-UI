import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import ItemFormDialog from "../components/ItemFormDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchStores } from "../store/storeSlice";

const StoreItemsPage = () => {
  const { storeId } = useParams();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.items);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch, storeId]);

  const handleOpenDialog = (item = null) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };

  if (!items) {
    return <Typography variant="h6">Items not found</Typography>;
  }
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={3}
        mb={3}
      >
        <Typography variant="h4">{} Store name</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Add Item
        </Button>
      </Box>

      <List>
        {items.map((item) => (
          <ListItem key={item.id} divider>
            <ListItemText primary={item.name} secondary={item.description} />
          </ListItem>
        ))}
      </List>
      <ItemFormDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        item={selectedItem}
      />
    </Container>
  );
};

export default StoreItemsPage;
