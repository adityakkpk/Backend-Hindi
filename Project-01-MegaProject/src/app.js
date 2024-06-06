import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// For CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
// For json data
app.use(express.json({limit: "16kb"}));
// For URL data
app.use(express.urlencoded({extended: true, limit: "16kb"}));
// For images or files
app.use(express.static("public"));
// For Cookies
app.use(cookieParser());



export {app}