import { useState } from "react";
import PreviewRenderer from "../frontend-app/src/preview/PreviewRenderer";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [generatedCode, setGeneratedCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [history, setHistory] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [planHistory, setPlanHistory] = useState([]);
  const sendMessage = async (userMessage) => {
    const res = await fetch("http://localhost:5000/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message:prompt
    }),
  });

    const data = await res.json();
    if (!res.ok) {
  setResponse("Error: " + data.error);
  return;
}

    // Save history before updating
    setHistory((prev) => [...prev, generatedCode]);
    setPlanHistory((prev) => [...prev, currentPlan]);
    setGeneratedCode(data.code);
    setExplanation(data.explanation);
    setCurrentPlan(data.plan);
  };

  const rollback = (index) => {
    setGeneratedCode(history[index]);
  };

  return (
    <div className="grid grid-cols-3 h-screen">
      
      {/* LEFT PANEL — CHAT */}
      <div className="border-r flex flex-col">
        <div className="flex-1 overflow-auto p-4 space-y-2">
          {messages.map((m, i) => (
            <div key={i} className="text-sm">
              <strong>{m.role === "user" ? "You" : "AI"}:</strong> {m.text}
            </div>
          ))}
        </div>

        <ChatInput onSend={sendMessage} />
      </div>

      {/* MIDDLE PANEL — CODE */}
      <div className="border-r p-2 flex flex-col">
        <h2 className="font-bold mb-2">Generated Code</h2>
        <textarea
          className="flex-1 border p-2 font-mono text-sm"
          value={generatedCode}
          onChange={(e) => setGeneratedCode(e.target.value)}
        />

        <h2 className="font-bold mt-2">AI Explanation</h2>
        <div className="text-sm bg-gray-50 p-2 border rounded">
          {explanation}
        </div>

        <h2 className="font-bold mt-2">History</h2>
        <div className="flex gap-2 flex-wrap">
          {history.map((_, i) => (
            <button
              key={i}
              onClick={() => rollback(i)}
              className="px-2 py-1 text-xs bg-gray-200 rounded"
            >
              Version {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL — LIVE PREVIEW */}
      <div className="p-4 bg-gray-100">
        <h2 className="font-bold mb-2">Live Preview</h2>
        <PreviewRenderer code={generatedCode} />
      </div>
    </div>
  );
}
