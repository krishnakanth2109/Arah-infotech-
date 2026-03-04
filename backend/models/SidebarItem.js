import mongoose from "mongoose";

const SidebarItemSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    link: { 
      type: String, 
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

const SidebarItem = mongoose.model("SidebarItem", SidebarItemSchema);

export default SidebarItem;