import express from 'express';
import { crud } from '../controllers/dm-loainguoidung';
import { addRoute } from '../utils/route';

const baseController = crud();
const router = express.Router();
addRoute(router, 'dm_loainguoidung', baseController);

export default router;