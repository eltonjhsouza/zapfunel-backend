import express from 'express';
import { createInstance, getInstances } from '../controllers/instanceController';

const router = express.Router();

router.post('/', createInstance);
router.get('/', getInstances);

export { router as instanceRouter };