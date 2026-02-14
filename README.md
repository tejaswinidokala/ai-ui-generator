AI UI Generator
Deterministic Multi-Agent UI Synthesis System

Overview

This project converts natural language UI requests into structured UI plans, React component code, and a live preview.

It uses a multi-step agent architecture (Planner → Generator → Explainer) and enforces a strict deterministic component whitelist to ensure reproducible, safe, and controlled UI generation.

The system is designed to demonstrate:

1.Structured reasoning
2.Controlled code synthesis
3.Deterministic rendering
4.Incremental updates
5.Basic safety enforcement

 Key Features

✅ Natural language → Structured UI plan
✅ Multi-step agent workflow
✅ Deterministic component whitelist
✅ React code generation
✅ Live preview rendering
✅ Incremental UI updates
✅ Lightweight safety validation
⚠️ Rollback (scaffolded / extendable)

System Architecture

High-Level Flow

1.User enters UI request.
2.Frontend sends `{ message, previousPlan }` to backend.
3.Backend runs:

   * Planner → Produces/updates structured JSON plan
   * Generator → Converts plan to React JSX
   * Explainer → Generates explanation
4.Frontend:

   * Validates JSX
   * Renders using fixed component registry
   * Displays explanation

Agent Design

1. Planner

* Interprets user intent.
* Produces structured JSON describing required components.
* Supports incremental modifications by merging with previous plan.
* Prevents unnecessary full regeneration.

Example output:

{
  "components": ["Navbar", "Sidebar", "Card"]
}


2. Generator

* Converts structured plan into React component code.
* Enforces strict whitelist of allowed components.
* Throws error if unauthorized components appear.
* Does not generate arbitrary JSX or dynamic components.


3. Explainer

* Produces a plain-language explanation of generated UI.
* Designed to justify structure and component choices.
* Currently lightweight; extendable to full LLM reasoning.


Deterministic Component System

To ensure reproducibility and safety:

* All components are predefined.
* Only approved components can be rendered.
* No dynamic component creation.
* No inline arbitrary scripting.

Allowed Components

* Navbar
* Sidebar
* Card
* Button
* Input
* Modal
* Table
* Chart

Both backend and frontend enforce this whitelist.

This guarantees:

* Styling consistency
* Structural control
* Predictable outputs

Safety & Validation

The system prevents unsafe code generation.

Blocked Patterns

Generated code is rejected if it contains:

* `window`
* `document`
* `script`
* `fetch`
* `localStorage`
* `eval`
JSX Validation

All generated JSX tags are validated against the allowed component registry before rendering.

Incremental Updates

The Planner merges new requests with the existing plan.

Example:

1. “Create a dashboard with navbar and sidebar.”
2. “Add a settings modal.”

Instead of rebuilding from scratch, the system appends `Modal` to the plan.

Design Decisions

* Multi-step agents instead of single prompt
  Enables structured reasoning and better control.

* Deterministic component whitelist
  Prevents hallucinated components and maintains consistency.

* Frontend validation layer
  Adds an extra safety boundary beyond backend enforcement.

* Plan-first architecture
  Makes incremental edits possible and enables future rollback.

Known Limitations

* Explainer currently simplified.
* Rollback history partially implemented.
* Component nesting rules can be strengthened.
* Generator produces relatively flat layouts.

Future Improvements

* Full version history + UI rollback selector.
* AST-based incremental patching instead of regeneration.
* Schema validation for planner outputs.
* Streaming responses.
* Diff view between versions.

Local Setup

Requirements

* Node.js v18+
* npm or yarn

Backend

cd backend
npm install

Create `.env`:

OPENAI_API_KEY=your_key_here
PORT=5000

Start:
npm start

Fronten:
cd frontend
npm install
npm start

Frontend:
`http://localhost:3000`

Backend:
`http://localhost:5000`

Deployment

Recommended:

* Frontend → Vercel / Netlify
* Backend → Render / Railway

Ensure:

* Environment variables configured
* Backend URL updated
* App publicly accessible

Demo

The demo video showcases:

1. Initial UI generation
2. Incremental modification
3. Live preview updates
4. Explanation output
5. Safety validation
6. Rollback concept

Your Name
GitHub: your-link
Live Demo: your-link
Demo Video: your-link

