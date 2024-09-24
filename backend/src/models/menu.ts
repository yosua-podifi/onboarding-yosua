import mongoose from "mongoose";
import { MenuItemType, MenuType } from "../shared/types";

const menuItemsSchema = new mongoose.Schema<MenuItemType>({
  menuItemId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const menuSchema = new mongoose.Schema<MenuType>({
  menuId: { type: String, required: true },
  type: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  menuItems: [menuItemsSchema],
});

const Menu = mongoose.model<MenuType>("Menu", menuSchema);
export default Menu;
