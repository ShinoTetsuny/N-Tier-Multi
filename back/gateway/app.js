import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
  });
const serviceMap = {
  news: "http://localhost:3001/news",
  users: "http://localhost:3003/users",
  products: "http://localhost:3002/products",
};

app.use("/api/:service", (req, res) => {
  const service = req.params.service;
  const target = serviceMap[service];
  if (target) {
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^/api/${service}`]: "",
      },
      logLevel: "debug",
    })(req, res);
  } else {
    res.status(404).send("Service not found");
  }
});

app.listen(process.env.GATEWAY_PORT, () => {
  console.log(`Server is running on port ${process.env.GATEWAY_PORT}`);
});
