import express from 'express';
import { crud } from '../controllers/dm-gioitinh';
import { addRoute } from '../utils/route';

const baseController = crud();
const router = express.Router();
addRoute(router, 'dm_gioitinh', baseController);

export default router;