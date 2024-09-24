import MenuService from "../services/MenuService";
import Menu from "../models/menu";

// Mock the Menu model
jest.mock("../models/menu");

describe("MenuService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getActiveMenu", () => {
    it("should return the active menu based on the current time", async () => {
      const mockMenu = { type: "breakfast" };
      (Menu.findOne as jest.Mock).mockResolvedValue(mockMenu);

      const menu = await MenuService.getActiveMenu();
      expect(menu).toEqual(mockMenu);
      expect(Menu.findOne).toHaveBeenCalledWith({ type: expect.any(String) });
    });

    it("should throw an error if fetching active menu fails", async () => {
      (Menu.findOne as jest.Mock).mockRejectedValue(new Error("Error"));

      await expect(MenuService.getActiveMenu()).rejects.toThrow(
        "Error fetching active menu"
      );
    });

    it("should handle the case where no active menu is available", async () => {
      (Menu.findOne as jest.Mock).mockRejectedValue(
        new Error("Error fetching active menu")
      );

      await expect(MenuService.getActiveMenu()).rejects.toThrow(
        "Error fetching active menu"
      );
    });

    it("should handle database retrieval error gracefully", async () => {
      (Menu.find as jest.Mock).mockRejectedValue(
        new Error("Database connection error")
      );

      await expect(MenuService.getMenuItems("1")).rejects.toThrow(
        "Database connection error"
      );
    });
  });

  describe("getMenuItem", () => {
    it("should return the menu item by its ID", async () => {
      const mockMenuItem = { menuItemId: "1" };
      const mockMenu = { menuItems: [mockMenuItem] };
      (Menu.find as jest.Mock).mockResolvedValue([mockMenu]);

      const menuItem = await MenuService.getMenuItem("1");
      expect(menuItem).toEqual(mockMenuItem);
    });

    it("should return null if menu item is not found", async () => {
      (Menu.find as jest.Mock).mockResolvedValue([]);
      const menu = await MenuService.getMenuItem("1");

      expect(menu).toBeNull();
    });

    it("should throw an error if fetching menu item fails", async () => {
      (Menu.find as jest.Mock).mockRejectedValue(new Error("Error"));

      await expect(MenuService.getMenuItem("1")).rejects.toThrow("Error");
    });

    it("should handle database retrieval error gracefully", async () => {
      (Menu.find as jest.Mock).mockRejectedValue(
        new Error("Database connection error")
      );

      await expect(MenuService.getMenuItems("1")).rejects.toThrow(
        "Database connection error"
      );
    });
  });

  describe("getMenuItems", () => {
    it("should return all items for a specific menu by its menuId", async () => {
      const mockMenuItems = [{ menuItemId: "1" }, { menuItemId: "2" }];
      const mockMenu = { menuId: "1", menuItems: mockMenuItems };
      (Menu.find as jest.Mock).mockResolvedValue([mockMenu]);

      const menuItems = await MenuService.getMenuItems("1");
      expect(menuItems).toEqual(mockMenuItems);
    });

    it("should return empty array if menu is not found", async () => {
      (Menu.find as jest.Mock).mockResolvedValue([]);
      const menu = await MenuService.getMenuItems("1");

      expect(menu).toEqual([]);
    });

    it("should throw an error if fetching menu items fails", async () => {
      (Menu.find as jest.Mock).mockRejectedValue(new Error("Error"));

      await expect(MenuService.getMenuItems("1")).rejects.toThrow("Error");
    });

    it("should handle database retrieval error gracefully", async () => {
      (Menu.find as jest.Mock).mockRejectedValue(
        new Error("Database connection error")
      );

      await expect(MenuService.getMenuItems("1")).rejects.toThrow(
        "Database connection error"
      );
    });
  });
});
