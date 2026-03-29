import express from "express";
import Plan from "../models/Plan.js";

const router = express.Router();

router.get("/plans/id/:id", async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id)
      .populate("days.exercises");

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;