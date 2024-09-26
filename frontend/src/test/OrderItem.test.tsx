import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import OrderItem from "../components/OrderItem";
import "@testing-library/jest-dom";

describe("OrderItem Component", () => {
  const mockHandleUpdateQuantity = vi.fn(); // Mock function for updating quantity
  const mockHandleRemoveItem = vi.fn(); // Mock function for removing item

  const props = {
    itemName: "Test Item",
    itemPrice: 10,
    itemSubTotal: 20,
    orderItemImage: "http://example.com/image.png",
    orderItemSeparator: "http://example.com/separator.png",
    quantity: 2,
    menuItemId: "1",
    handleUpdateQuantity: mockHandleUpdateQuantity,
    handleRemoveItem: mockHandleRemoveItem,
  };

  beforeEach(() => {
    render(<OrderItem {...props} />);
  });

  it("renders the item name", () => {
    expect(screen.getByText(/Test Item/i)).toBeInTheDocument();
  });

  it("renders the item price", () => {
    expect(screen.getByText("$10")).toBeInTheDocument();
  });

  it("renders the item subtotal", () => {
    expect(screen.getByText("$20")).toBeInTheDocument();
  });

  it("calls handleUpdateQuantity when incrementing the quantity", () => {
    const incrementButton = screen.getByAltText("increment quantity");
    fireEvent.click(incrementButton);
    expect(mockHandleUpdateQuantity).toHaveBeenCalledWith("1", 3); // Expected quantity after increment
  });

  it("calls handleUpdateQuantity when decrementing the quantity", () => {
    const decrementButton = screen.getByAltText("decrement quantity");
    fireEvent.click(decrementButton);
    expect(mockHandleUpdateQuantity).toHaveBeenCalledWith("1", 1); // Expected quantity after decrement
  });

  it("calls handleRemoveItem when the remove button is clicked", () => {
    const removeButton = screen.getByAltText("remove item");
    fireEvent.click(removeButton);
    expect(mockHandleRemoveItem).toHaveBeenCalledWith("1"); // Check if the correct item ID is passed
  });
});
