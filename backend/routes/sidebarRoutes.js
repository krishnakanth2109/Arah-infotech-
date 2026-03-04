import express from "express";
import SidebarItem from "../models/SidebarItem.js";

const router = express.Router();

// GET all sidebar items
router.get("/", async (req, res) => {
  try {
    const items = await SidebarItem.find().sort({ createdAt: 1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sidebar items", error: error.message });
  }
});

// CREATE a new sidebar item
router.post("/", async (req, res) => {
  try {
    const { name, link } = req.body;
    if (!name || !link) {
      return res.status(400).json({ message: "Name and link are required" });
    }
    
    const newItem = new SidebarItem({ name, link });
    await newItem.save();
    
    res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    res.status(500).json({ message: "Failed to create sidebar item", error: error.message });
  }
});

// UPDATE a sidebar item
router.put("/:id", async (req, res) => {
  try {
    const { name, link } = req.body;
    const updatedItem = await SidebarItem.findByIdAndUpdate(
      req.params.id,
      { name, link },
      { new: true } // Return updated document
    );

    if (!updatedItem) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ success: true, item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Failed to update sidebar item", error: error.message });
  }
});

// DELETE a sidebar item
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await SidebarItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete sidebar item", error: error.message });
  }
});

export default router;