import express from 'express';
import { createWorkflowHandler, getWorkflows } from '../controllers/workflowController';

const router = express.Router();

router.post('/', createWorkflowHandler);
router.get('/', getWorkflows);

export { router as workflowRouter };