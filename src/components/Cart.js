import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { placeOrder } from "../store/orderSlice";

const Cart = ({ storeId }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.order.cart);
  const orderStatus = useSelector((state) => state.order.orderStatus);
  const error = useSelector((state) => state.payment.error);

  const handlePlaceOrder = async () => {
    const orderData = {
      storeId,
      items: cart.map((item) => ({
        itemId: item.itemId,
        quantity: item.quantity,
      })),
    };
    await dispatch(placeOrder(orderData));
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
              primary={`Item : ${item.itemName}`}
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
