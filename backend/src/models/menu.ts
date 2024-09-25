import mongoose from "mongoose";
import { MenuItemDTO, MenuDTO } from "../shared/types";

const menuItemsSchema = new mongoose.Schema<MenuItemDTO>({
  menuItemId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const menuSchema = new mongoose.Schema<MenuDTO>({
  menuId: { type: String, required: true },
  type: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  menuItems: [menuItemsSchema],
});

const Menu = mongoose.model<MenuDTO>("Menu", menuSchema);
export default Menu;
