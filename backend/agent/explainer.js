export async function runExplainer(message, plan, previousPlan) {
  const componentNames = plan?.components?.map((component) => component.type) || [];

  if (componentNames.length === 0) {
    return "No UI components were generated from this request.";
  }

  const readableComponents = componentNames.join(", ");

  if (previousPlan) {
    return `Updated the existing UI based on your request: "${message}". The new version includes ${readableComponents}.`;
  }

  return `Created a UI based on your request: "${message}". The design includes ${readableComponents} with generated JSX and CSS for the live preview.`;
}
