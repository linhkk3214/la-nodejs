import express from 'express';
import { crud } from '../controllers/user';
import { addRoute } from '../utils/route';

const baseController = crud();
const router = express.Router();
addRoute(router, 'users', baseController);

export default router;