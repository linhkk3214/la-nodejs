import express from 'express';
import { crud } from '../controllers/dm-httuyensinh';
import { addRoute } from '../utils/route';

const baseController = crud();
const router = express.Router();
addRoute(router, 'dm_httuyensinh', baseController);

export default router;