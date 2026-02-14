export async function runPlanner(message, previousPlan) {
  let plan = previousPlan
    ? JSON.parse(JSON.stringify(previousPlan))
    : {
        layout: "dashboard",
        components: [],
      };

  if (!previousPlan) {
    plan.components.push({
      type: "Navbar",
      props: { title: "Demo App" },
    });

    plan.components.push({
      type: "Sidebar",
      props: { items: ["Home", "Users", "Settings"] },
    });

    plan.components.push({
      type: "Card",
      props: { title: "Overview" },
    });
  }

  // Incremental modifications
  if (message.toLowerCase().includes("modal")) {
    const exists = plan.components.some((c) => c.type === "Modal");

    if (!exists) {
      plan.components.push({
        type: "Modal",
        props: { title: "Settings Modal" },
      });
    }
  }

  if (message.toLowerCase().includes("button")) {
    const exists = plan.components.some((c) => c.type === "Button");

    if (!exists) {
      plan.components.push({
        type: "Button",
        props: { label: "Click Me" },
      });
    }
  }

  return plan;
}


  
  