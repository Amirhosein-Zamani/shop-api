import express from "express";
import dotenv from "dotenv";
import { globalErrorhandler } from "./app/middleware/ErrorHandler.middleware.js";
import { categoryRoutes } from "./app/routes/Category.routes.js";
import { productRoutes } from "./app/routes/Product.routes.js";
import { connectDB } from "./app/config/db.conf.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.use(globalErrorhandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

