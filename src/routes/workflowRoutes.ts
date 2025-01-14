import express from 'express';
import { createWorkflowHandler, getWorkflows, workFlowReceiveHandler } from '../controllers/workflowController';

const router = express.Router();

router.post('/create', createWorkflowHandler);
router.get('/', getWorkflows);
router.post('/receive/:workflowid', workFlowReceiveHandler);

export { router as workflowRouter };