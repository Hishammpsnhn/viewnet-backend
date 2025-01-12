const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
}));

const authServiceUrl = process.env.USER_SERVICE_URL;

app.use(
  "/api/user",
  createProxyMiddleware({
    target:authServiceUrl,
    changeOrigin: true,
    cookieDomainRewrite: "localhost", 
  })
);


app.get("/", (req, res) => {
  res.send("API Gateway is running");
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
