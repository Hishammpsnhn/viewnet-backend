const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const dotenv = require("dotenv");
const authenticate = require("./authenticateMiddleware.js");

dotenv.config();
const app = express();
app.use(
  cors({
    origin: true,  // Allow all origins
    credentials: true,
  })
);


app.use(authenticate);
const services = {
  user: process.env.USER_SERVICE_URL,
};

const routes = [
  {
    context: "/api/user",
    target: services.user,
    changeOrigin: true,
    cookieDomainRewrite: "localhost",
  },
];
routes.forEach((route) => {
  app.use(
    route.context,
    createProxyMiddleware({
      target: route.target,
      changeOrigin: true,
    })
  );
});

// app.use(
//   "/api/user",
//   createProxyMiddleware({
//     target:authServiceUrl,
//     changeOrigin: true,
//     cookieDomainRewrite: "localhost",
//   })
// );

app.get("/", (req, res) => {
  res.send("API Gateway is running");
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
