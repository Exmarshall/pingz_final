import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import connectDB from "./config/db.ts";
import authRoutes from "./routes/auth.routes.ts";
import { initializeSocket } from "./socket/socket.ts";


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth",authRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

//listen to the socket events

initializeSocket(server)

connectDB()
  .then(() => {
    console.log("✅ Connected to MongoDB");
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to the database:", error);
  });
