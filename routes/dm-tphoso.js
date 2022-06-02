import express from 'express';
import { crud } from '../controllers/dm-tphoso';
import { addRoute } from '../utils/route';

const baseController = crud();
const router = express.Router();
addRoute(router, 'dm_tphoso', baseController);

export default router;