// src/pages/OrdersPage.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPendingOrdersByUser } from "../utils/api";
import { processPayment } from "../store/paymentSlice";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const paymentStatus = useSelector((state) => state.payment.status);
  const token = localStorage.getItem("token");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getPendingOrdersByUser(token);
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };
    fetchOrders();
    const prices = orders.flatMap((order) =>
      order.orderItems.map((orderItem) => orderItem.item.price)
    );
    let totalSum = 0;
    prices.forEach((price) => {
      totalSum += price;
    });
    setTotalAmount(totalSum);
  }, [token, orders]);

  function getOrderItemPrices(order) {
    const price = order.orderItems.map((orderItem) => orderItem.item.price);
    const qty = order.orderItems.map((orderItem) => orderItem.quantity);
    return {
      price,
      qty,
    };
  }

  const handlePayOrder = async (orderId) => {
    dispatch(processPayment({ orderId }));
  };
  return (
    <Container maxWidth="md">
      <Box mt={8}>
        <Typography variant="h5" component="h1" gutterBottom>
          Your Orders
        </Typography>
        {/* add item currency order.currency */}
        <List>
          {orders.map(
            (order) =>
              order.status !== "COMPLETED" && (
                <>
                  <ListItem key={order.id} divider>
                    <ListItemText
                      primary={` Order(s) from ${order.Store.name}`}
                      secondary={`Quantity: ${
                        getOrderItemPrices(order).qty
                      }  UGX: ${getOrderItemPrices(order).price} `}
                    />
                    {order.status}
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handlePayOrder(order.id)}
                      disabled={!order || paymentStatus === "loading"}
                    >
                      Pay Order
                    </Button>
                  </ListItem>
                </>
              )
          )}
        </List>
        <Divider style={{ backgroundColor: "#1976d2" }} />
        <ListItem>
          <ListItemText primary={`Total Amount: `} />
          UGX: {totalAmount}
        </ListItem>
      </Box>
      <Divider style={{ backgroundColor: "#1976d2" }} />
    </Container>
  );
};

export default OrdersPage;
