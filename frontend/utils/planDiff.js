export function getPlanDiff(oldPlan, newPlan) {
  if (!oldPlan) return "Initial UI created.";

  const oldTypes = oldPlan.components.map(c => c.type);
  const newTypes = newPlan.components.map(c => c.type);

  const added = newTypes.filter(t => !oldTypes.includes(t));
  const removed = oldTypes.filter(t => !newTypes.includes(t));

  let message = "";
  if (added.length) message += `Added: ${added.join(", ")}. `;
  if (removed.length) message += `Removed: ${removed.join(", ")}.`;

  return message || "Minor layout/content updates.";
}
