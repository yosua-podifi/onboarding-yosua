import express from "express";
const router = express.Router();

import MenuController from "../controllers/MenuController";
const menuController = new MenuController();

// Get Current Order
router.get("/", async (req, res) => {
  menuController.getCurrentOrder(req, res);
});

// Add a MenuItem to Order
router.post("/add", async (req, res) => {
  menuController.addMenuItemToOrder(req, res);
});

// Get specific OrderItem
router.get("/item/:menuItemId", async (req, res) => {
  menuController.getOrderItem(req, res);
});

// Get all OrderItems
router.get("/items", async (req, res) => {
  menuController.getOrderItems(req, res);
});

// Update an OrderItem's quantity
router.put("/update", async (req, res) => {
  menuController.updateOrderItem(req, res);
});

// Remove an OrderItem
router.delete("/remove/:menuItemId", async (req, res) => {
  menuController.removeOrderItem(req, res);
});

// Confirm the order
router.post("/confirm", async (req, res) => {
  menuController.confirmOrder(req, res);
});

export default router;
