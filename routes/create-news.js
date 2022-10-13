import express from 'express';
import {addNews } from '../controllers/create-news.js';

const router = express.Router();

router.post('/addNews',addNews);

export default router;