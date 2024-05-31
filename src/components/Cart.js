import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../store/orderSlice";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const Cart = ({ storeId }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.order.cart);
  const orderStatus = useSelector((state) => state.order.orderStatus);
  const error = useSelector((state) => state.order.error);

  const handlePlaceOrder = () => {
    const orderData = {
      storeId,
      items: cart.map((item) => ({
        itemId: item.itemId,
        quantity: item.quantity,
      })),
    };
    dispatch(placeOrder(orderData));
  };

  return (
    <div>
      <Typography variant="h4">Cart</Typography>
      {orderStatus === "failed" && (
        <Typography color="error">{error}</Typography>
      )}
      <List>
        {cart.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Item ID: ${item.name}`}
              secondary={`Quantity: ${item.quantity}`}
            />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePlaceOrder}
        disabled={cart.length === 0 || orderStatus === "loading"}
      >
        Place Order
      </Button>
    </div>
  );
};

export default Cart;
