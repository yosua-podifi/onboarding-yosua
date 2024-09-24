import express, { Request, Response } from "express";
const router = express.Router();
import MenuService from "../services/MenuService";
import OrderService from "../services/OrderService";

// 1. Get Active Menu
router.get("/active", async (req, res) => {
  try {
    const menu = await MenuService.getActiveMenu();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve active menu" });
  }
});

// 2. Get specific MenuItem by ID
router.get("/item/:menuItemId", async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;
    const menuItem = await MenuService.getMenuItem(menuItemId);
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve menu item" });
  }
});

// 3. Get all MenuItems for a Menu
router.get("/:menuId/items", async (req, res) => {
  try {
    const menuId = req.params.menuId;
    const menuItems = await MenuService.getMenuItems(menuId);
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve menu items" });
  }
});

// 4. Add a MenuItem to Order
router.post("/order/add", async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;
    const updatedOrder = await OrderService.addToOrder(menuItemId, quantity);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to order" });
  }
});

// // 5. Get Current Order
// router.get("/order", async (req, res) => {
//   try {
//     const order = await OrderService.getOrder();
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to retrieve order" });
//   }
// });

// // 6. Get specific OrderItem
// router.get("/order/item/:menuItemId", async (req, res) => {
//   try {
//     const menuItemId = req.params.menuItemId;
//     const orderItem = await OrderService.getOrderItem(menuItemId);
//     res.status(200).json(orderItem);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to retrieve order item" });
//   }
// });

// // 7. Get all OrderItems
// router.get("/order/items", async (req, res) => {
//   try {
//     const orderItems = await OrderService.getOrderItems();
//     res.status(200).json(orderItems);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to retrieve order items" });
//   }
// });

// // 8. Update an OrderItem's quantity
// router.put("/order/item/update", async (req, res) => {
//   try {
//     const { menuItemId, quantity } = req.body;
//     const updatedOrderItem = await OrderService.updateOrderItem(
//       menuItemId,
//       quantity
//     );
//     res.status(200).json(updatedOrderItem);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update order item" });
//   }
// });

// // 9. Remove an OrderItem
// router.delete("/order/item/remove/:menuItemId", async (req, res) => {
//   try {
//     const menuItemId = req.params.menuItemId;
//     const updatedOrder = await OrderService.removeOrderItem(menuItemId);
//     res.status(200).json(updatedOrder);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to remove order item" });
//   }
// });

// // 10. Confirm the order
// router.post("/order/confirm", async (req, res) => {
//   try {
//     await OrderService.confirmOrder();
//     res.status(200).json({ message: "Order confirmed!" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to confirm order" });
//   }
// });

export default router;
