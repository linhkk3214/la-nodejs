import express from 'express';
import { crud } from '../controllers/dm-loaigiayto';
import { addRoute } from '../utils/route';

const baseController = crud();
const router = express.Router();
addRoute(router, 'dm_loaigiayto', baseController);

export default router;