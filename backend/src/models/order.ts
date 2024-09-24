import mongoose from "mongoose";

// OrderItem Schema (from class diagram)
const orderItemSchema = new mongoose.Schema({
  menuItemId: { type: String, required: true },
  quantity: { type: Number, required: true },
});

// Order Schema
const orderSchema = new mongoose.Schema({
  orderItems: [orderItemSchema], // Array of order items
  total: { type: Number, default: 0 }, // Total price of the order
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
