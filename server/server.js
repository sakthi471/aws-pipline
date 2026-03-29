const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Todo API is running" });
});

app.use("/api/todos", todoRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
