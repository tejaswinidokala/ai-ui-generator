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
app.use(cors());
app.use(express.json());

app.use("/api/generate", generateRoute);

app.listen(5000, () => console.log("Server running on port 5000"));
