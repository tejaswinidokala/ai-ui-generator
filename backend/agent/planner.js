export async function runPlanner(message, previousPlan) {
  const text = message.toLowerCase();

  let plan = previousPlan
    ? JSON.parse(JSON.stringify(previousPlan))
    : {
        layout: "custom",
        components: [],
      };

  const hasComponent = (type) => {
    return plan.components.some((component) => component.type === type);
  };

  const addComponent = (type, props = {}) => {
    if (!hasComponent(type)) {
      plan.components.push({
        type,
        props,
      });
    }
  };

  // If user asks for a full dashboard/app layout
  if (
    !previousPlan &&
    (text.includes("dashboard") ||
      text.includes("admin panel") ||
      text.includes("full app") ||
      text.includes("complete app") ||
      text.includes("layout"))
  ) {
    plan.layout = "dashboard";

    addComponent("Navbar", { title: "Demo App" });
    addComponent("Sidebar", { items: ["Home", "Users", "Settings"] });
    addComponent("Card", {
      title: "Overview",
      description: "A clean overview card for your dashboard.",
    });
  }

  // Navbar
  if (
    text.includes("navbar") ||
    text.includes("navigation") ||
    text.includes("header")
  ) {
    addComponent("Navbar", { title: "Demo App" });
  }

  // Sidebar
  if (text.includes("sidebar") || text.includes("menu")) {
    addComponent("Sidebar", { items: ["Home", "Users", "Settings"] });
  }

  // Card
  if (
    text.includes("card") ||
    text.includes("overview") ||
    text.includes("section")
  ) {
    addComponent("Card", {
      title: "Overview",
      description: "This card contains clean content with modern spacing and styling.",
    });
  }

  // Button
  if (text.includes("button") || text.includes("click")) {
    addComponent("Button", {
      label: extractQuotedText(message) || "Click Me",
    });
  }

  // Input
  if (
    text.includes("input") ||
    text.includes("textbox") ||
    text.includes("text box") ||
    text.includes("form")
  ) {
    addComponent("Input", {
      placeholder: "Enter your text...",
    });
  }

  // Modal
  if (text.includes("modal") || text.includes("popup")) {
    addComponent("Modal", {
      title: "Settings Modal",
      content: "This is a clean modal component.",
    });
  }

  // Fallback if nothing matched
  if (plan.components.length === 0) {
    addComponent("Card", {
      title: "Generated UI",
      description: message,
    });
  }

  return plan;
}

function extractQuotedText(message) {
  const match = message.match(/["']([^"']+)["']/);
  return match ? match[1] : null;
}