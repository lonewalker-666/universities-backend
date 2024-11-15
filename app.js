import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compress from "compression";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const allowedOrigins = [
    'http://localhost:3000',
    'https://dev.theuniversitiesusa.com',
    'https://theuniversitiesusa.com'
  ];
  
  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, 
    exposedHeaders: ['Authorization', 'X-Refresh-Token']
  };
  
  app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compress());
app.set("trust proxy", 1);
app.use("/fonts", express.static("fonts"));

export default app;