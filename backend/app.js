import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api", productRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
