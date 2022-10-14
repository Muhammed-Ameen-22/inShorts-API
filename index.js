import express from 'express';
import dotenv from "dotenv";
import db from './config/db.js';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js'
import createNewsRoutes from './routes/create-news.js'
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT || 8090;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', createNewsRoutes);

app.listen(port, () => {
    console.log('server started @', port);
})
