import express from "express";
const router = express.Router();

import MenuController from "../controllers/MenuController";

const menuController = new MenuController();

// 1. Get Active Menu
router.get("/active", async (req, res) => {
  menuController.getMenu(req, res);
});

// 2. Get specific MenuItem by ID
router.get("/item/:menuItemId", async (req, res) => {
  menuController.getMenuItem(req, res);
});

// 3. Get all MenuItems for a Menu
router.get("/:menuId/items", async (req, res) => {
  menuController.getMenuItems(req, res);
});

export default router;
