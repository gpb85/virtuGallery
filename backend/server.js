import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/usersRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import guestsRoutes from "./routes/guestRoutes.js";

dotenv.config();

const __dirName = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const corsOptions = {
  credentials: true,
  origin: process.env.CLIENT_URL,
};

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

//paths
app.use("/", express.static(join(__dirName, "public")));
app.use("/users", userRoutes);
app.use("/auth", authRoutes, itemRoutes);
app.use("/guests", guestsRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost: ${PORT}`);
});
