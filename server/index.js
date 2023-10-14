import "colors";
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import findConfig from "find-config";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import busRoutes from "./routes/busRoutes.js";
import busStopRoutes from "./routes/busStopRoutes.js";
import busRouteRoutes from "./routes/busRouteRoutes.js";
import userTripRoutes from "./routes/userTripRoutes.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let dbUri;

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: findConfig(".env.dev") });
  dbUri = process.env.MONGO_URI_DEV;
} else dbUri = process.env.MONGO_URI;

connectDB(dbUri);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/braintree", paymentRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/busstops", busStopRoutes);
app.use("/api/busroutes", busRouteRoutes);
app.use("/api/usertrips", userTripRoutes);
app.use("/api/busjourneys", userTripRoutes);

app.get("/braintree", (req, res) => {
  res.sendFile(path.join(__dirname, "braintree.html"));
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`.yellow.bold);
  });
}

export default app;
