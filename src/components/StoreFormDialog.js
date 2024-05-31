import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
} from "@mui/material";

const StoreFormDialog = ({ open, onClose, onSubmit, store }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    if (store) {
      setFormData({
        name: store.name || "",
        description: store.description || "",
        status: store.status || "ACTIVE",
      });
    }
  }, [store]);

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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={3}
      mb={3}
    >
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{store ? "Edit Store" : "Create Store"}</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Store Name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            required
            rows={4}
            style={{ marginTop: "1em" }}
          />
          <TextField
            name="status"
            label="Status"
            value={formData.status}
            required
            onChange={handleChange}
            fullWidth
            style={{ marginTop: "1em" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={!formData.name || !formData.description}
          >
            {store ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StoreFormDialog;
