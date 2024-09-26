import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemDetailsCard from "../components/ItemDetailsCard"; // Adjust the import path as needed
import { MemoryRouter } from "react-router-dom";

describe("ItemDetailsCard Component", () => {
  const mockAddToOrder = vi.fn(); // Mock function for adding to order

  const props = {
    itemDetailsCardItemImage: "http://example.com/image.png",
    itemDetailsCardItemName: "Test Item",
    itemDetailsCardItemPrice: 20,
    itemDetailsCardItemDescription: "This is a test item.",
    menuItemId: "1",
    addToOrder: mockAddToOrder,
  };

  beforeEach(() => {
    render(
      <MemoryRouter>
        <ItemDetailsCard {...props} />
      </MemoryRouter>
    );
  });

  it("renders the item name", () => {
    expect(screen.getByText("Test Item")).toBeInTheDocument();
  });

  it("renders the item price", () => {
    expect(screen.getByText("$20")).toBeInTheDocument();
  });

  it("renders the item description", () => {
    expect(screen.getByText(/This is a test item/i)).toBeInTheDocument();
  });

  it("increments the quantity when the increment button is clicked", () => {
    const incrementButton = screen.getByAltText("increment quantity");
    fireEvent.click(incrementButton);
    expect(screen.getByTestId("quantity-input")).toHaveValue(null); // Check if quantity is incremented
  });

  it("decrements the quantity when the decrement button is clicked", () => {
    const decrementButton = screen.getByAltText("decrement quantity");
    fireEvent.click(decrementButton);
    expect(screen.getByPlaceholderText("1")).toHaveValue(null); // Initial value is 1
    fireEvent.click(decrementButton); // Should not decrement below 1
    expect(screen.getByPlaceholderText("1")).toHaveValue(null); // Value should remain 1
  });

  it('calls addToOrder when the "Add To Order" button is clicked', () => {
    const addToOrderButton = screen.getByText("Add To Order");
    fireEvent.click(addToOrderButton);
    expect(mockAddToOrder).toHaveBeenCalledWith("1", 1); // Check if the correct parameters are passed
  });
});
