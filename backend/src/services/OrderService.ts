class OrderService {
  private orders: any[];
  private currentOrder: any;

  constructor() {
    this.orders = [];
    this.currentOrder = {
      items: [],
      total: 0,
    };
  }

  async addToOrder(itemId: string, quantity: number) {
    // Logic to add a menu item to the current order
    const item = { itemId, quantity };
    this.currentOrder.items.push(item);
    this.updateOrderTotal();
    return this.currentOrder;
  }

  async getOrder() {
    return this.currentOrder;
  }

  async getOrderItems() {
    return this.currentOrder.items;
  }

  async updateOrderItem(itemId: string, quantity: number) {
    const item = this.currentOrder.items.find((i: any) => i.itemId === itemId);
    if (!item) throw new Error("Order item not found");
    item.quantity = quantity;
    this.updateOrderTotal();
    return item;
  }

  async removeOrderItem(itemId: string) {
    this.currentOrder.items = this.currentOrder.items.filter(
      (i: any) => i.itemId !== itemId
    );
    this.updateOrderTotal();
    return this.currentOrder;
  }

  async confirmOrder() {
    this.orders.push(this.currentOrder);
    const confirmedOrder = this.currentOrder;
    this.currentOrder = { items: [], total: 0 }; // Reset current order after confirmation
    return confirmedOrder;
  }

  updateOrderTotal() {
    this.currentOrder.total = this.currentOrder.items.reduce(
      (total: number, item: any) => total + item.quantity * 10,
      0
    ); // Example logic for total
  }
}

export default new OrderService();
