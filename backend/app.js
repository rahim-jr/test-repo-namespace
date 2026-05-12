import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

//auth routes
app.use("/api/auth", authRoutes);

app.use("/api", productRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
