import { useState } from "react";
import PreviewRenderer from "./preview/PreviewRenderer";

function App() {
  const [prompt, setPrompt] = useState("");
  const [plan, setPlan] = useState(null);
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");

  const [history, setHistory] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState("");

  const handleGenerate = async () => {
    const res = await fetch(
      "https://ai-ui-generator-production-4012.up.railway.app/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: prompt,
          previousPlan: plan, // important for iteration
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data?.error || "Something went wrong");
      return;
    }

    // ✅ Fix for "App is not defined" in Live Preview:
    // If backend returns "export default ..." without defining App, make it define App.
    let incomingCode = data.code || "";
    if (incomingCode && !/function\s+App\s*\(|const\s+App\s*=|class\s+App\s+extends/.test(incomingCode)) {
      // Try to convert "export default function X()" to "function App()"
      incomingCode = incomingCode
        .replace(/export\s+default\s+function\s+\w+\s*\(/, "function App(")
        .replace(/export\s+default\s+function\s*\(/, "function App(");

      // If it still doesn't export default, add it
      if (!/export\s+default\s+App\s*;/.test(incomingCode)) {
        incomingCode += "\n\nexport default App;\n";
      }
    }

    setPlan(data.plan);
    setCode(incomingCode);
    setExplanation(data.explanation);

    const newVersion = {
      plan: data.plan,
      code: incomingCode,
      explanation: data.explanation,
    };

    setHistory((prev) => [...prev, newVersion]);
    setSelectedVersion(history.length);
  };

  const handleVersionChange = (index) => {
    const i = Number(index);
    const version = history[i];
    if (!version) return;

    setPlan(version.plan);
    setCode(version.code);
    setExplanation(version.explanation);
    setSelectedVersion(i);
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
      {/* LEFT PANEL */}
      <div style={{ width: "40%", padding: "20px", borderRight: "1px solid #ddd" }}>
        <h2>AI Chat</h2>

        <textarea
          rows="5"
          style={{ width: "100%" }}
          placeholder="Describe your UI..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <br />
        <br />

        <button onClick={handleGenerate}>Generate / Modify UI</button>

        <br />
        <br />

        {history.length > 0 && (
          <>
            <h3>Versions</h3>
            <select value={selectedVersion} onChange={(e) => handleVersionChange(e.target.value)}>
              {history.map((_, i) => (
                <option key={i} value={i}>
                  Version {i + 1}
                </option>
              ))}
            </select>
          </>
        )}

        <hr />

        <h3>Explanation</h3>
        <p>{explanation}</p>
      </div>

      {/* RIGHT PANEL */}
      <div style={{ width: "60%", padding: "20px" }}>
        <h2>Generated Code (Editable)</h2>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
            width: "100%",
            height: "200px",
            fontFamily: "monospace",
          }}
        />

        <hr />

        <h2>Live Preview</h2>
        {code && <PreviewRenderer code={code} />}
      </div>
    </div>
  );
}

export default App;
