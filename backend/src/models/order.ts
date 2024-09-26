import mongoose from "mongoose";
import { OrderDTO, OrderItemDTO } from "../shared/types";

// OrderItem Schema (from class diagram)
const orderItemSchema = new mongoose.Schema<OrderItemDTO>({
  menuItemId: { type: String, required: true },
  quantity: { type: Number, required: true },
  menuItemName: { type: String, required: true },
  menuItemDescription: { type: String, required: true },
  menuItemPrice: { type: Number, required: true },
  itemTotal: { type: Number, required: true },
  menuItemImageUrl: { type: String, required: true },
});

// Order Schema
const orderSchema = new mongoose.Schema<OrderDTO>({
  orderItems: [orderItemSchema], // Array of order items
  totalOrderPrice: { type: Number, default: 0 }, // Total price of the order
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
