import express from 'express';
import { populateNews } from '../controllers/Dashboard.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const router = express.Router();

router.post('/populateNews',isLoggedIn,populateNews);

export default router;