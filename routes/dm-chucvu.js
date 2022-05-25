import express from 'express';
import { crud } from '../controllers/dm-chucvu';
import { addRoute } from '../utils/route';

const baseController = crud();
const router = express.Router();
addRoute(router, 'dm_chucvu', baseController);

export default router;