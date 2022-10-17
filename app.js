const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Order = require("./models/Order");
const bodyParser = require("body-parser");

const MONGODB_URI =
  "mongodb+srv://root:marvans.stock.token@cluster0.tqlmgux.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to mongoose");
  })
  .catch((e) => {
    console.log("Could not connect to mongoose");
  });

app.use(express.static(path.join(__dirname, "build")));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/orders", async (req, res) => {
  const orders = await Order.find({}).sort({ date: -1 });
  res.json(orders);
});

app.get("/orders/new", (req, res) => {
  res.render("new_order.ejs");
});

app.post("/orders/new", async (req, res) => {
  const order = await new Order(req.body);
  await order.save();
  res.json({ saved: "true" });
});

app.get("/order/search", async (req, res) => {
  const { q } = req.query;
  const exp = { $regex: "^" + q };
  const orders = await Order.find({
    $or: [
      { name: exp },
      { products: { $elemMatch: { name: exp } } },
      { products: { $elemMatch: { codes: exp } } },
    ],
  });
  res.json(orders);
});

app.get("/orders/:id", async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  res.json(order);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(5000, () => {
  console.log("Connected to port 3000");
});
