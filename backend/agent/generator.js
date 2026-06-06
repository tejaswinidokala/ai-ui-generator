export async function runGenerator(plan) {
  let code = `
function App() {
  const [message, setMessage] = React.useState("");

  return (
    <div className="generated-page">
`;

  plan.components.forEach((component) => {
    if (component.type === "Navbar") {
      code += `
      <nav className="generated-navbar">
        <h2>${component.props?.title || "My App"}</h2>
        <div className="generated-nav-links">
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </nav>
`;
    }

    if (component.type === "Sidebar") {
      code += `
      <aside className="generated-sidebar">
        <h3>${component.props?.title || "Menu"}</h3>
        <p>Dashboard</p>
        <p>Profile</p>
        <p>Settings</p>
      </aside>
`;
    }

    if (component.type === "Card") {
      code += `
      <section className="generated-card">
        <h2>${component.props?.title || "Beautiful UI Card"}</h2>
        <p>${component.props?.description || "This card contains clean content with modern spacing and styling."}</p>
      </section>
`;
    }

    if (component.type === "Button") {
      code += `
      <button
        className="generated-button"
        onClick={() => setMessage("Button clicked successfully!")}
      >
        ${component.props?.text || component.props?.label || "Click Me"}
      </button>

      {message && <p className="generated-message">{message}</p>}
`;
    }

    if (component.type === "Input") {
      code += `
      <input
        className="generated-input"
        placeholder="${component.props?.placeholder || "Enter your text..."}"
      />
`;
    }

    if (component.type === "Modal") {
      code += `
      <div className="generated-modal">
        <h2>${component.props?.title || "Modal Title"}</h2>
        <p>${component.props?.content || "This is a simple modal preview."}</p>
        <button className="generated-button">Close</button>
      </div>
`;
    }
  });

  code += `
    </div>
  );
}
`;

  const css = `
.generated-page {
  min-height: 320px;
  padding: 32px;
  background: linear-gradient(135deg, #f8fafc, #e0f2fe);
  color: #0f172a;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
}

.generated-navbar {
  width: 100%;
  max-width: 760px;
  padding: 18px 24px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.generated-navbar h2 {
  margin: 0;
  color: #2563eb;
}

.generated-nav-links {
  display: flex;
  gap: 18px;
  font-weight: 600;
  color: #475569;
}

.generated-sidebar {
  width: 220px;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.12);
}

.generated-sidebar h3 {
  margin-top: 0;
  color: #2563eb;
}

.generated-sidebar p {
  padding: 10px 12px;
  margin: 6px 0;
  border-radius: 10px;
  background: #f1f5f9;
}

.generated-card {
  width: 100%;
  max-width: 520px;
  padding: 28px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.14);
  text-align: center;
}

.generated-card h2 {
  margin-top: 0;
  color: #1d4ed8;
}

.generated-card p {
  color: #475569;
  line-height: 1.6;
}

.generated-button {
  border: none;
  padding: 14px 26px;
  border-radius: 999px;
  background: #2563eb;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;
}

.generated-button:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.generated-message {
  padding: 12px 18px;
  border-radius: 12px;
  background: #dcfce7;
  color: #166534;
  font-weight: 600;
}

.generated-input {
  width: 100%;
  max-width: 420px;
  padding: 14px 16px;
  border: 2px solid #bfdbfe;
  border-radius: 14px;
  font-size: 16px;
  outline: none;
}

.generated-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.16);
}

.generated-modal {
  width: 100%;
  max-width: 420px;
  padding: 28px;
  background: #ffffff;
  border-radius: 22px;
  box-shadow: 0 22px 45px rgba(15, 23, 42, 0.18);
  text-align: center;
}
`;

  return {
    code,
    css,
  };
}