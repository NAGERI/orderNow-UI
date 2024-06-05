import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const ItemFormDialog = ({ open, onClose, onSubmit, item }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 10,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        description: item.description || "",
        price: item.price || 10,
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{item ? "Edit Item" : "Create Item"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="normal"
          label="Name"
          name="name"
          type="text"
          fullWidth
          required
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          name="description"
          margin="normal"
          label="Description"
          type="text"
          fullWidth
          rows={4}
          required
          value={formData.description}
          style={{ marginTop: "1em" }}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="Price"
          name="price"
          type="number"
          fullWidth
          required
          value={formData.price}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!formData.price || !formData.description || !formData.name}
        >
          {item ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemFormDialog;
