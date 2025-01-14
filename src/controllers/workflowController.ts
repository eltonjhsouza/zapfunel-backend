import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { createWorkflow, getWorkflowsByUserId } from '../services/workflowService';
import { Prisma } from '@prisma/client';
import { defaultErrorHandler, defaultErrorHandlerType } from '../middlewares/errorHandler';
import { handlePlatformEvent } from '../services/platformService';

interface WebhookData {
  url: string;
  secretToken: string;
  userId: number;
  workflowId: string;
}

export const createWorkflowHandler = async (req: Request, res: Response) : Promise<Response | defaultErrorHandlerType | undefined>  => {
  try {
    const workflowData: Prisma.workflowCreateInput = req.body;
    if (!workflowData[0].trigger && workflowData[0].trigger?.type === 'integration') {
      // criar webhook



    }
    workflowData.userId = 1;
    
    // Validação básica
    if (!workflowData.name) {
      return res.status(400).json(defaultErrorHandler('Name and user are required', 400));
    }

    const workflow = await createWorkflow(workflowData);
    res.status(201).json(workflow);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Tratamento de erros específicos do Prisma
      if (error.code === 'P2002') {
        return res.status(400).json(defaultErrorHandler('User not found', 400));
      }
    }
    res.status(500).json(defaultErrorHandler('Error creating workflow', 400 ));
  }
};

export const getWorkflows = async (req: Request, res: Response, next: NextFunction) : Promise<Response | undefined> => {
  const { userId } = req.query;

  if (!userId || Array.isArray(userId)) {
    return res.status(400).json(defaultErrorHandler('Valid user ID is required', 400));
  }

  try {
    const workflows = await getWorkflowsByUserId(Number(userId));
    res.json(workflows);
  } catch (error) {
    res.status(500).json(defaultErrorHandler('Error fetching workflows', 400));
  }
};

export const workFlowReceiveHandler = async (req: Request, res: Response) : Promise<Response | undefined> => {
  const { workflowid } = req.params;

  if (!workflowid) {
    return res.status(400).json(defaultErrorHandler('Workflow ID is required', 400));
  }

  const workflow = await prisma.workflow.findMany({
    where: {
      workflowId: workflowid?.toString(),
    }
  });

  try {
    await handlePlatformEvent(platform, workflowid, normalizedData);
    res.json(workflow);
  } catch (error) {
    res.status(500).json(defaultErrorHandler('Error updating workflow', 400));
  }
};