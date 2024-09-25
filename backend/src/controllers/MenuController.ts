import { Request, Response } from "express";
import MenuService from "../services/MenuService";
import OrderService from "../services/OrderService";

class MenuController {
  menu: MenuService;
  order: OrderService;

  constructor() {
    this.menu = new MenuService();
    this.order = new OrderService();
  }

  async getMenu(req: Request, res: Response) {
    try {
      const menu = await this.menu.getActiveMenu();
      res.status(200).json(menu);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve active menu" });
    }
  }

  async getMenuItem(req: Request, res: Response) {
    try {
      const menuItemId = req.params.menuItemId;
      const menuItem = await this.menu.getMenuItem(menuItemId);
      res.status(200).json(menuItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve menu item" });
    }
  }

  async getMenuItems(req: Request, res: Response) {
    try {
      const menuId = req.params.menuId;
      const menuItems = await this.menu.getMenuItems(menuId);
      res.status(200).json(menuItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve menu items" });
    }
  }

  // Order Controller

  async getCurrentOrder(req: Request, res: Response) {
    try {
      const order = await this.order.getOrder();
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve order" });
    }
  }

  async addMenuItemToOrder(req: Request, res: Response) {
    try {
      const { menuItemId, quantity } = req.body;
      const updatedOrder = await this.order.addToOrder(menuItemId, quantity);
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: "Failed to add item to order" });
    }
  }

  async addOrderItem(req: Request, res: Response) {
    try {
      const { menuItemId, quantity } = req.body;
      const addedItem = await this.order.addOrderItem(menuItemId, quantity);
      res.status(200).json(addedItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to add item to order" });
    }
  }

  async getOrderItem(req: Request, res: Response) {
    try {
      const menuItemId = req.params.menuItemId;
      const orderItem = await this.order.getOrderItem(menuItemId);
      res.status(200).json(orderItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve order item" });
    }
  }

  async getOrderItems(req: Request, res: Response) {
    try {
      const orderItems = await this.order.getOrderItems();
      res.status(200).json(orderItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve order items" });
    }
  }

  async updateOrderItem(req: Request, res: Response) {
    try {
      const { menuItemId, quantity } = req.body;
      const updatedOrderItem = await this.order.updateOrderItem(
        menuItemId,
        quantity
      );
      res.status(200).json(updatedOrderItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to update order item" });
    }
  }

  async removeOrderItem(req: Request, res: Response) {
    try {
      const menuItemId = req.params.menuItemId;
      const updatedOrder = await this.order.removeOrderItem(menuItemId);
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: "Failed to remove order item" });
    }
  }

  async confirmOrder(req: Request, res: Response) {
    try {
      await this.order.confirmOrder();
      res.status(200).json({ message: "Order confirmed!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to confirm order" });
    }
  }
}

export default MenuController;
