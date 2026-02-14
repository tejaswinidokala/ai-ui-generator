import express from "express";
import { runPlanner } from "../agent/planner.js";
import { runGenerator } from "../agent/generator.js";
import { runExplainer } from "../agent/explainer.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { message, previousPlan } = req.body;

    const plan = await runPlanner(message, previousPlan);
    const code = await runGenerator(plan);
    const explanation = await runExplainer(message, plan, previousPlan);

    res.json({ plan, code, explanation });
  } catch (err) {
  console.error("🔥 FULL BACKEND ERROR:", err);
  res.status(500).json({ error: err.message });
}

});

export default router;
