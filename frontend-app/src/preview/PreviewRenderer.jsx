import React from "react";
import * as Babel from "@babel/standalone";
import { componentRegistry } from "../../../frontend/components/registry";
import { validateGeneratedCode } from "../../../frontend/utils/validator";

export default function PreviewRenderer({ code }) {
  const validation = validateGeneratedCode(code);

  if (!validation.valid) {
    return (
      <div className="p-4 text-red-600">
        ❌ {validation.error}
      </div>
    );
  }

  try {
    const transformedCode = Babel.transform(code, {
      presets: ["react"]
    }).code;

    const scope = { React, ...componentRegistry };

    const Component = new Function(
      ...Object.keys(scope),
      `${transformedCode}; return App;`
    )(...Object.values(scope));

    return (
      <div className="p-4 border rounded bg-gray-50 h-full overflow-auto">
        <Component />
      </div>
    );
  } catch (err) {
    return (
      <div className="p-4 text-red-600">
        ⚠️ Rendering Error: {err.message}
      </div>
    );
  }
}
