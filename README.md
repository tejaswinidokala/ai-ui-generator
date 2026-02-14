AI UI GENERATOR 
Deterministic Multi-Agent UI Synthesis System

🌐 LIVE DEMO:

- Live App: 
  https://quiet-dusk-a14c69.netlify.app/

- Demo Video: 
 https://drive.google.com/file/d/1iJ58hReGKoMyL6-3cRrbYgOBLRBfQ6ks/view?usp=sharing

- GitHub Repository:  
  https://github.com/tejaswinidokala/ai-ui-generator



📌 PROJECT OVERVIEW:

This project converts natural language UI descriptions into structured UI plans, React component code, and a live preview.

It uses a multi-step agent architecture (Planner → Generator → Explainer) and enforces a deterministic component system to ensure predictable and safe UI generation.

THE SYSTEM DEMONSTRATES:

- Structured LLM reasoning
- Controlled code synthesis
- Deterministic rendering
- Iterative UI updates
- Basic safety & CORS handling
- Full production deployment



🏗 ARCHITECTURE:

High-Level Flow

1. User enters a UI description in the frontend.
2. Frontend sends request to backend `/api/generate`.
3. Backend executes:
   - Planner → Creates or updates structured JSON plan
   - Generator → Converts plan into React JSX
   - Explainer → Generates explanation
4. Frontend:
   - Displays generated code
   - Renders live preview
   - Stores version history


 AGENT DESIGN:

1️. Planner
- Interprets user intent.
- Produces structured plan (JSON format).
- Supports iterative modifications using previous plan.
- Prevents unnecessary full regeneration.

2️. Generator
- Converts structured plan into React code.
- Enforces a fixed component whitelist.
- Prevents arbitrary JSX injection.

3️. Explainer
- Generates natural language explanation.
- Justifies structure and layout decisions.


DETERMINISTIC COMPONENT SYSTEM:

The system restricts UI generation to a predefined set of components.

Allowed Components

- Navbar  
- Sidebar  
- Card  
- Button  
- Input  
- Modal  
- Table  
- Chart  

Benefits:
- Prevents hallucinated components
- Maintains layout consistency
- Ensures reproducibility
- Reduces unsafe code risks


🔐 SAFETY MEASURES:

- Environment variables stored securely (Railway).
- OpenAI API key never committed to GitHub.
- CORS handling for production deployment.
- Backend validation before rendering.
- Controlled component rendering via whitelist.


🔁 ITERATIVE MODIFICATIONS:

The planner merges new requests with previous UI plans.

Example:

1. “Create dashboard with navbar and sidebar.”
2. “Add settings modal.”

Instead of rebuilding from scratch, the system updates the existing plan.


🕒 VERSION HISTORY & ROLLBACK:

- Each generation is stored in local state.
- Users can switch between previous versions.
- Allows experimentation without losing prior outputs.


🚀 DEPLOYMENT:

 Backend
- Hosted on Railway
- Express.js server
- OpenAI API integration
- Dynamic `PORT` handling

 Frontend
- Hosted on Netlify
- Built using Vite
- Netlify proxy configured to route `/api/*` to Railway backend
- Eliminates CORS issues in production


🛠 TECH STACK

Frontend
- React
- Vite
- Babel (Preview rendering)
- Netlify

Backend
- Node.js
- Express
- OpenAI API
- Railway


📦 LOCAL SETUP:

Backend

cd backend
npm install
npm start

Frontend

CD FRONTEND-APP
npm install
npm run dev

KNOWN LIMITATIONS

1. Preview renderer expects component named App.
2. Layout nesting constraints can be improved.
3. Schema validation for agent outputs can be strengthened.
4. No persistent database storage (history is local state only)

🚀 FUTURE IMPROVEMENTS

1. Stronger schema validation for planner output.
2. AST-based incremental code updates.
3. Diff comparison between versions.
4. Streaming LLM responses.
5. UI export functionality.

 KEY DESIGN DECISIONS

1. Multi-step agent > single prompt
2. Deterministic component registry for stability
3. Backend + frontend separation
4. Netlify proxy used to avoid CORS complexity
5. Production-ready deployment pipeline

👤 AUTHOR:

Dokala Venkata Satya Naga Sai Tejaswini
GitHub: https://github.com/tejaswinidokala

