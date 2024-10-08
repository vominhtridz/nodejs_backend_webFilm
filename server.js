import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import cookiParser from 'cookie-parser'
import bodyParser from "body-parser";
import dotenv from "dotenv";
import users from "./routes/users.js";
import { fileURLToPath } from "url"; // ES Modules: to get the directory name
import ConnectDB from "./config/connectMgoDb.js";
import RefreshToken from "./routes/RefreshToken.js";
dotenv.config(); // Ensure this is at the top
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const Port = process.env.PORT || 8080;
import { credentials } from "./Middleware/credential.js";
import { corsOptions } from "./config/corOptions.js";
// Middleware
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookiParser());
// Static Files
app.use(express.static(path.join(__dirname, "public")));
// Routes
app.use("/refresh", RefreshToken);
app.use("/user", users);
// Database Connection
ConnectDB(); // Call function to connect to MongoDB using Mongoose
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
  });
});
