import express from 'express';
import { connectionState, createInstance, getInstances } from '../controllers/instanceController';

const router = express.Router();

router.post('/create', createInstance);
router.get('/connectionState/:instanceName', connectionState);

export { router as instanceRouter };