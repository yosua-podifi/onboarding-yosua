import OrderService from "../services/OrderService";
import Order from "../models/order";
import MenuService from "../services/MenuService";

// Mock the Order model and MenuService class
jest.mock("../models/order");
jest.mock("../services/MenuService");

describe("OrderService", () => {
  let orderService: OrderService;
  let menuServiceMock: jest.Mocked<MenuService>;

  beforeEach(() => {
    orderService = new OrderService();
    menuServiceMock = new MenuService() as jest.Mocked<MenuService>;
    orderService.menu = menuServiceMock;
    jest.clearAllMocks();
  });

  describe("addToOrder", () => {
    it("should add a menu item to the order", async () => {
      const mockMenuItem: any = { menuItemId: "1", price: 10 };
      const mockOrderItem = {
        orderItems: [{ menuItemId: "1", quantity: 1, menuItemPrice: 10 }],
      };
      menuServiceMock.getMenuItem.mockResolvedValue(mockMenuItem);
      (Order.findOne as jest.Mock).mockResolvedValue(null);
      (Order.updateOne as jest.Mock).mockResolvedValue({});

      const result = await orderService.addToOrder("1", 2);

      expect(result).toEqual({});
      expect(menuServiceMock.getMenuItem).toHaveBeenCalledWith("1");
      expect(Order.updateOne).toHaveBeenCalledTimes(2);
    });

    it("should update the quantity of an existing order item", async () => {
      const mockMenuItem: any = { menuItemId: "1", price: 10 };
      const mockOrderItem = {
        orderItems: [{ menuItemId: "1", quantity: 1, menuItemPrice: 10 }],
      };
      menuServiceMock.getMenuItem.mockResolvedValue(mockMenuItem);
      (Order.findOne as jest.Mock).mockResolvedValue(mockOrderItem);
      (Order.updateOne as jest.Mock).mockResolvedValue({});

      const result = await orderService.addToOrder("1", 2);

      expect(result).toEqual({});
      expect(menuServiceMock.getMenuItem).toHaveBeenCalledWith("1");
      expect(Order.updateOne).toHaveBeenCalledTimes(2);
    });

    it("should throw an error if the menu item is not found", async () => {
      menuServiceMock.getMenuItem.mockResolvedValue(null);

      await expect(orderService.addToOrder("1", 2)).rejects.toThrow(
        "Menu item not found"
      );
    });
  });

  describe("addOrderItem", () => {
    it("should add a menu item to the order", async () => {
      const mockMenuItem: any = {
        menuItemId: "1",
        name: "Item 1",
        description: "Description",
        price: 10,
      };
      menuServiceMock.getMenuItem.mockResolvedValue(mockMenuItem);
      (Order.updateOne as jest.Mock).mockResolvedValue({});

      const result = await orderService.addOrderItem("1", 2);

      expect(result).toEqual({});
      expect(menuServiceMock.getMenuItem).toHaveBeenCalledWith("1");
      expect(Order.updateOne).toHaveBeenCalledTimes(2);
    });

    it("should throw an error if the menu item is not found", async () => {
      menuServiceMock.getMenuItem.mockResolvedValue(null);

      await expect(orderService.addOrderItem("1", 2)).rejects.toThrow(
        "Menu item not found"
      );
    });
  });

  describe("getOrder", () => {
    it("should return the current order", async () => {
      const mockOrder = { orderItems: [], totalOrderPrice: 0 };
      (Order.findOne as jest.Mock).mockResolvedValue(mockOrder);

      const result = await orderService.getOrder();

      expect(result).toEqual(mockOrder);
      expect(Order.findOne).toHaveBeenCalledWith(
        { _id: "66f396c5ee5747ff0dc7ff55" },
        { orderItems: 1, totalOrderPrice: 1 }
      );
    });
  });

  describe("getOrderItems", () => {
    it("should return the order items", async () => {
      const mockOrder = { orderItems: [] };
      (Order.findOne as jest.Mock).mockResolvedValue(mockOrder);

      const result = await orderService.getOrderItems();

      expect(result).toEqual(mockOrder);
      expect(Order.findOne).toHaveBeenCalledWith(
        { _id: "66f396c5ee5747ff0dc7ff55" },
        { orderItems: 1 }
      );
    });
  });

  describe("getOrderItem", () => {
    it("should return the order item by its menuItemId", async () => {
      const mockOrderItem = { orderItems: [{ menuItemId: "1" }] };
      (Order.findOne as jest.Mock).mockResolvedValue(mockOrderItem);

      const result = await orderService.getOrderItem("1");

      expect(result).toEqual(mockOrderItem);
      expect(Order.findOne).toHaveBeenCalledWith(
        { "orderItems.menuItemId": "1" },
        { "orderItems.$": 1 }
      );
    });
  });

  describe("updateOrderItem", () => {
    it("should update the quantity of an existing order item", async () => {
      const mockOrderItem = {
        orderItems: [{ menuItemId: "1", menuItemPrice: 10 }],
      };
      (Order.findOne as jest.Mock).mockResolvedValue(mockOrderItem);
      (Order.updateOne as jest.Mock).mockResolvedValue({});

      const result = await orderService.updateOrderItem("1", 2);

      expect(result).toEqual({});
      expect(Order.findOne).toHaveBeenCalledWith(
        { "orderItems.menuItemId": "1" },
        { "orderItems.$": 1 }
      );
      expect(Order.updateOne).toHaveBeenCalledTimes(2);
    });

    it("should throw an error if the order item is not found", async () => {
      (Order.findOne as jest.Mock).mockResolvedValue(null);

      await expect(orderService.updateOrderItem("1", 2)).rejects.toThrow(
        "Order item not found"
      );
    });
  });

  describe("removeOrderItem", () => {
    it("should remove an order item", async () => {
      const mockOrderItem = { orderItems: [{ menuItemId: "1" }] };
      (Order.findOne as jest.Mock).mockResolvedValue(mockOrderItem);
      (Order.updateOne as jest.Mock).mockResolvedValue({});

      const result = await orderService.removeOrderItem("1");

      expect(result).toEqual({});
      expect(Order.findOne).toHaveBeenCalledWith(
        { "orderItems.menuItemId": "1" },
        { "orderItems.$": 1 }
      );
      expect(Order.updateOne).toHaveBeenCalledTimes(2);
    });

    it("should throw an error if the order item is not found", async () => {
      (Order.findOne as jest.Mock).mockResolvedValue(null);

      await expect(orderService.removeOrderItem("1")).rejects.toThrow(
        "Order item not found"
      );
    });
  });

  describe("confirmOrder", () => {
    it("should confirm the order", async () => {
      (Order.updateOne as jest.Mock).mockResolvedValue({});

      await orderService.confirmOrder();

      expect(Order.updateOne).toHaveBeenCalledWith(
        { _id: "66f396c5ee5747ff0dc7ff55" },
        { $set: { orderItems: [] } }
      );
      expect(Order.updateOne).toHaveBeenCalledTimes(2);
    });
  });

  describe("updateOrderTotal", () => {
    it("should update the total order price", async () => {
      const mockOrder = { orderItems: [{ itemTotal: 10 }, { itemTotal: 20 }] };
      (Order.findOne as jest.Mock).mockResolvedValue(mockOrder);
      (Order.updateOne as jest.Mock).mockResolvedValue({});

      await orderService.updateOrderTotal();

      expect(Order.findOne).toHaveBeenCalledWith({
        _id: "66f396c5ee5747ff0dc7ff55",
      });
      expect(Order.updateOne).toHaveBeenCalledWith(
        { _id: "66f396c5ee5747ff0dc7ff55" },
        { $set: { totalOrderPrice: 30 } }
      );
    });
  });
});
