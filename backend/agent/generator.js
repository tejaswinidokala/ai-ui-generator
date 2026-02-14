const ALLOWED_COMPONENTS = [
  "Navbar",
  "Sidebar",
  "Card",
  "Button",
  "Modal",
  "Input",
];

export async function runGenerator(plan) {

  // 🔒 Deterministic whitelist enforcement
  plan.components.forEach((component) => {
    if (!ALLOWED_COMPONENTS.includes(component.type)) {
      throw new Error(`Component ${component.type} is not allowed.`);
    }
  });

  let code = `
function App() {
  return (
    <>
`;

  plan.components.forEach((component) => {
    const propsString = Object.entries(component.props || {})
      .map(([key, value]) =>
        typeof value === "string"
          ? `${key}="${value}"`
          : `${key}={${JSON.stringify(value)}}`
      )
      .join(" ");

    code += `      <${component.type} ${propsString} />\n`;
  });

  code += `
    </>
  );
}
`;

  return code;
}
