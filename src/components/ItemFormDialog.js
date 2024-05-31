import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const ItemFormDialog = ({ open, onSubmit, handleClose, item }) => {
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
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{item ? "Edit Item" : "Create Item"}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
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
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            required
            value={formData.price}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={
              !formData.price || !formData.description || !formData.name
            }
          >
            {item ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ItemFormDialog;
