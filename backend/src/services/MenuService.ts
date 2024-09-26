// This file handles the logic for retrieving and managing menu-related data.
import Menu from "../models/menu";

class MenuService {
  constructor() {}

  // Get the active menu, for now, let's assume it's the first menu
  async getActiveMenu() {
    try {
      // query menus between startHours and endHours
      const menus = await Menu.find();
      const menu: any = menus.find((m: any) => {
        const startTime = m.startTime;
        const endTime = m.endTime;
        const currentHours = new Date().getHours();

        return currentHours >= startTime && currentHours < endTime;
      });

      const res = await this.getMenuItems(menu.menuId);

      if (!res) {
        throw new Error("No active menu available");
      }

      return res; // For simplicity, returning the first menu as the active one
    } catch (error) {
      throw new Error("Error fetching active menu");
    }
  }

  // Get a specific menu item by its ID
  async getMenuItem(menuItemId: string | number) {
    const menus = await Menu.find();

    try {
      for (const menu of menus) {
        const menuItem = menu.menuItems.find(
          (item: any) => item.menuItemId == menuItemId
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
        return menu;
      }
      return [];
    } catch (error) {
      throw new Error("Error fetching menu items");
    }
  }
}

export default MenuService;
