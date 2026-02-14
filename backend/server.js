import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


import express from "express";
import cors from "cors";
import generateRoute from "./routes/generate.js";

const app = express();
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
      "https://quiet-dusk-a14c69.netlify.app",
  ],
  methods: ["GET", "POST","OPTIONS"],
   allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options("*", cors());
app.use(express.json());

app.use("/api/generate", generateRoute);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

