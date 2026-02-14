import { allowedComponentNames } from "../components/registry";

export function validateGeneratedCode(code) {
  // 1️⃣ Block dangerous JS
  const forbiddenPatterns = [
    "script",
    "window.",
    "document.",
    "fetch(",
    "localStorage",
    "eval("
  ];

  for (let pattern of forbiddenPatterns) {
    if (code.includes(pattern)) {
      return { valid: false, error: `Forbidden pattern detected: ${pattern}` };
    }
  }

  // 2️⃣ Ensure only allowed components are used
  const componentRegex = /<([A-Z][A-Za-z0-9]*)/g;
  let match;

  while ((match = componentRegex.exec(code)) !== null) {
    const componentName = match[1];
    if (!allowedComponentNames.includes(componentName)) {
      return { valid: false, error: `Component not allowed: ${componentName}` };
    }
  }

  return { valid: true };
}
