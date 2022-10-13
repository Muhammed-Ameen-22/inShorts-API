import express from 'express';
import { populateNews, readNews} from '../controllers/dashboard.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const router = express.Router();

router.get('/populateNews',isLoggedIn,populateNews);
router.post('/readNews',isLoggedIn,readNews);

export default router;