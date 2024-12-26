import express from 'express';
import { connectionState, createInstance, deleteInstance, logoutInstance } from '../controllers/instanceController';

const router = express.Router();

router.post('/create', createInstance);
router.get('/connectionState/:instanceName', connectionState);
router.delete('/logout/:instanceName', logoutInstance);
router.delete('/delete/:instanceName', deleteInstance);

export { router as instanceRouter };