import { useState } from "react";
import PreviewRenderer from "./preview/PreviewRenderer";

function App() {
  const [prompt, setPrompt] = useState("");
  const [plan, setPlan] = useState(null);
  const [code, setCode] = useState("");
  const [css, setCss] = useState("");
  const [explanation, setExplanation] = useState("");

  const [history, setHistory] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState("");

  const handleGenerate = async () => {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: prompt,
          previousPlan: plan,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.error || "Something went wrong");
        return;
      }

      let incomingCode = data.code || "";

      if (
        incomingCode &&
        !/function\s+App\s*\(|const\s+App\s*=|class\s+App\s+extends/.test(
          incomingCode
        )
      ) {
        incomingCode = incomingCode
          .replace(/export\s+default\s+function\s+\w+\s*\(/, "function App(")
          .replace(/export\s+default\s+function\s*\(/, "function App(");

        if (!/export\s+default\s+App\s*;/.test(incomingCode)) {
          incomingCode += "\n\nexport default App;\n";
        }
      }

      const incomingCss = data.css || "";
      const incomingExplanation =
        data.explanation || "The UI was generated successfully.";

      setPlan(data.plan);
      setCode(incomingCode);
      setCss(incomingCss);
      setExplanation(incomingExplanation);

      const newVersion = {
        plan: data.plan,
        code: incomingCode,
        css: incomingCss,
        explanation: incomingExplanation,
      };

      setHistory((prev) => [...prev, newVersion]);
      setSelectedVersion(history.length);
    } catch (error) {
      console.error(error);
      alert("Frontend error while generating UI");
    }
  };

  const handleVersionChange = (index) => {
    const i = Number(index);
    const version = history[i];
    if (!version) return;

    setPlan(version.plan);
    setCode(version.code);
    setCss(version.css || "");
    setExplanation(version.explanation);
    setSelectedVersion(i);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial" }}>
      {/* LEFT PANEL */}
      <div
        style={{
          width: "35%",
          padding: "28px",
          borderRight: "1px solid #ddd",
          background: "#111827",
          color: "#f9fafb",
        }}
      >
        <h2>AI Chat</h2>

        <textarea
          rows="6"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            fontFamily: "monospace",
          }}
          placeholder="Describe your UI..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <br />
        <br />

        <button
          onClick={handleGenerate}
          style={{
            padding: "12px 22px",
            borderRadius: "10px",
            border: "none",
            background: "#2563eb",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Generate / Modify UI
        </button>

        <br />
        <br />

        {history.length > 0 && (
          <>
            <h3>Versions</h3>
            <select
              value={selectedVersion}
              onChange={(e) => handleVersionChange(e.target.value)}
              style={{ padding: "8px", borderRadius: "8px" }}
            >
              {history.map((_, i) => (
                <option key={i} value={i}>
                  Version {i + 1}
                </option>
              ))}
            </select>
          </>
        )}

        <hr style={{ margin: "24px 0" }} />

        <h3>Explanation</h3>
        <p style={{ lineHeight: "1.6", color: "#d1d5db" }}>
          {explanation || "Your explanation will appear here after generation."}
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div
        style={{
          width: "65%",
          padding: "28px",
          background: "#f3f4f6",
          color: "#111827",
          overflowY: "auto",
        }}
      >
        <h2>Generated Code JSX Editable</h2>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
            width: "100%",
            height: "220px",
            padding: "12px",
            borderRadius: "10px",
            fontFamily: "monospace",
            fontSize: "14px",
          }}
        />

        <h2>Generated CSS Editable</h2>

        <textarea
          value={css}
          onChange={(e) => setCss(e.target.value)}
          style={{
            width: "100%",
            height: "180px",
            padding: "12px",
            borderRadius: "10px",
            fontFamily: "monospace",
            fontSize: "14px",
          }}
        />

        <hr style={{ margin: "28px 0" }} />

        <h2>Live Preview</h2>

        <div
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
          }}
        >
          <style>{css}</style>
          {code && <PreviewRenderer code={code} />}
        </div>
      </div>
    </div>
  );
}

export default App;