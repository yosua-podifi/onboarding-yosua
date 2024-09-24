// This file handles the logic for retrieving and managing menu-related data.
import Menu from "../models/menu";

class MenuService {
  constructor() {}

  // Get the active menu, for now, let's assume it's the first menu
  async getActiveMenu() {
    try {
      let menuType = "";
      const currentTime = new Date();
      if (currentTime) {
        if (
          (currentTime.getHours() === 8 && currentTime.getMinutes() >= 0) ||
          (currentTime.getHours() > 8 && currentTime.getHours() < 12) ||
          (currentTime.getHours() === 11 && currentTime.getMinutes() <= 59)
        ) {
          menuType = "breakfast";
        } else if (
          (currentTime.getHours() === 12 && currentTime.getMinutes() >= 0) ||
          (currentTime.getHours() > 12 && currentTime.getHours() < 17) ||
          (currentTime.getHours() === 16 && currentTime.getMinutes() <= 59)
        ) {
          menuType = "lunch";
        } else if (
          (currentTime.getHours() === 17 && currentTime.getMinutes() >= 0) ||
          (currentTime.getHours() > 17 && currentTime.getHours() < 22) ||
          (currentTime.getHours() === 22 && currentTime.getMinutes() <= 0)
        ) {
          menuType = "dinner";
        }
      }

      const menu = await Menu.findOne({
        type: menuType,
      });

      if (!menu) {
        throw new Error("No active menu available");
      }

      return menu; // For simplicity, returning the first menu as the active one
    } catch (error) {
      throw new Error("Error fetching active menu");
    }
  }

  // Get a specific menu item by its ID
  async getMenuItem(menuItemId: string) {
    const menus = await Menu.find();

    try {
      for (const menu of menus) {
        const menuItem = menu.menuItems.find(
          (item: any) => item.menuItemId === menuItemId
        );
        if (menuItem) return menuItem;
      }
      return null;
    } catch (error) {
      throw new Error("Error fetching menu item");
    }
  }

  // Get all items for a specific menu by its menuId
  async getMenuItems(menuId: string) {
    const menus = await Menu.find();

    try {
      const menu = menus.find((m) => m.menuId === menuId);
      if (menu) {
        return menu.menuItems;
      }
      return [];
    } catch (error) {
      throw new Error("Error fetching menu items");
    }
  }
}

export default new MenuService();
