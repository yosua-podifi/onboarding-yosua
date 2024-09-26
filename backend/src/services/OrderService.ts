import Order from "../models/order";
import MenuService from "./MenuService";
import NotificationService from "./NotificationService";

class OrderService {
  menu: MenuService;
  notificationService: NotificationService;
  constructor() {
    this.menu = new MenuService();
    this.notificationService = new NotificationService();
  }

  async addToOrder(itemId: string, quantity: number) {
    // Logic to add a menu item to the current order
    const menuItem: any = await this.menu.getMenuItem(itemId);

    if (!menuItem) {
      throw new Error("Menu item not found");
    }

    const getOrder = await this.getOrderItem(itemId);

    if (getOrder) {
      const updatedItem = await Order.updateOne(
        {
          "orderItems.menuItemId": itemId,
        },
        {
          $set: {
            "orderItems.$.quantity": getOrder.orderItems[0].quantity + quantity,
            "orderItems.$.itemTotal":
              (getOrder.orderItems[0].quantity + quantity) *
              getOrder.orderItems[0].menuItemPrice,
          },
        }
      );

      await this.updateOrderTotal();

      return updatedItem;
    } else {
      const addedItem = await this.addOrderItem(itemId, quantity);

      return addedItem;
    }
  }

  async addOrderItem(itemId: string, quantity: number) {
    // Logic to add a menu item to the current order
    const menuItem: any = await this.menu.getMenuItem(itemId);

    if (!menuItem) {
      throw new Error("Menu item not found");
    }

    const addedItem = await Order.updateOne(
      {
        _id: "66f396c5ee5747ff0dc7ff55",
      },
      {
        $push: {
          orderItems: {
            menuItemId: menuItem.menuItemId,
            quantity: quantity,
            menuItemName: menuItem.name,
            menuItemDescription: menuItem.description,
            menuItemPrice: menuItem.price,
            itemTotal: menuItem.price * quantity,
            menuItemImageUrl: menuItem.imageUrl,
          },
        },
      }
    );

    await this.updateOrderTotal();

    return addedItem;
  }

  async getOrder() {
    const orders = await Order.findOne(
      {
        _id: "66f396c5ee5747ff0dc7ff55",
      },
      { orderItems: 1, totalOrderPrice: 1 }
    );

    return orders;
  }

  async getOrderItems() {
    const orders = await Order.findOne(
      {
        _id: "66f396c5ee5747ff0dc7ff55",
      },
      { orderItems: 1 }
    );

    return orders;
  }

  async getOrderItem(menuItemId: string) {
    const orders = await Order.findOne(
      {
        "orderItems.menuItemId": menuItemId,
      },
      { "orderItems.$": 1 }
    );

    return orders;
  }

  async updateOrderItem(itemId: string, quantity: number) {
    const getOrder = await this.getOrderItem(itemId);

    if (!getOrder) {
      throw new Error("Order item not found");
    }

    const updatedItem = await Order.updateOne(
      {
        "orderItems.menuItemId": itemId,
      },
      {
        $set: {
          "orderItems.$.quantity": quantity,
          "orderItems.$.itemTotal":
            getOrder?.orderItems[0].menuItemPrice * quantity,
        },
      }
    );

    await this.updateOrderTotal();
    return updatedItem;
  }

  async removeOrderItem(itemId: string) {
    const getOrder = await this.getOrderItem(itemId);

    if (!getOrder) {
      throw new Error("Order item not found");
    }

    const updatedOrder = await Order.updateOne(
      {
        _id: "66f396c5ee5747ff0dc7ff55",
      },
      {
        $pull: {
          orderItems: {
            menuItemId: itemId,
          },
        },
      }
    );
    await this.updateOrderTotal();

    return updatedOrder;
  }

  async confirmOrder() {
    // Logic to confirm the order
    await Order.updateOne(
      {
        _id: "66f396c5ee5747ff0dc7ff55",
      },
      {
        $set: {
          orderItems: [],
        },
      }
    );

    await this.updateOrderTotal();
  }

  async updateOrderTotal() {
    // update total order price
    const totalOrderPrice = await Order.findOne({
      _id: "66f396c5ee5747ff0dc7ff55",
    });

    const total = totalOrderPrice?.orderItems.reduce(
      (total: number, item: any) => total + item.itemTotal,
      0
    );

    await Order.updateOne(
      {
        _id: "66f396c5ee5747ff0dc7ff55",
      },
      {
        $set: {
          totalOrderPrice: total,
        },
      }
    );
  }
}

export default OrderService;
