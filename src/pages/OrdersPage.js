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
} from "@mui/material";
import { getOrdersByUser, getOrderStatusAmount } from "../utils/api";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderByUser, setOrderByUser] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrdersByUser(token);
        const response2 = await getOrderStatusAmount(token);
        setOrders(response.data);
        setOrderByUser(response2.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };
    fetchOrders();
  }, [token]);

  function getOrderItemPrices(order) {
    const price = order.orderItems.map((orderItem) => orderItem.item.price);
    const qty = order.orderItems.map((orderItem) => orderItem.quantity);
    return {
      price,
      qty,
    };
  }

  return (
    <Container maxWidth="md">
      <Box mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Orders Status: {orderByUser.status}
        </Typography>
        {/* add item currency order.currency */}
        <List>
          {orders.map((order) => (
            <ListItem key={order.id} divider>
              <ListItemText
                primary={` Order(s) from ${order.Store.name}`}
                secondary={`Quantity: ${getOrderItemPrices(order).qty}  UGX: ${
                  getOrderItemPrices(order).price
                } `}
              />
            </ListItem>
          ))}
        </List>
        <Divider style={{ backgroundColor: "#1976d2" }} />
        <ListItem>
          <ListItemText primary={`Total Amount: `} />
          UGX: {orderByUser.totalSum}
        </ListItem>
      </Box>
      <Divider style={{ backgroundColor: "#1976d2" }} />
    </Container>
  );
};

export default OrdersPage;
