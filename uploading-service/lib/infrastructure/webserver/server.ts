import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import videoMetadataRoutes from '../../interface/routes/videoMetadataRoutes'

dotenv.config();

const createServer = async () => {
  const app = express();
  const corsOptions = {
    origin: ["http://localhost:4000", "http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));


  // Routes
  app.use("/", videoMetadataRoutes);

  return app;
};

export default createServer;