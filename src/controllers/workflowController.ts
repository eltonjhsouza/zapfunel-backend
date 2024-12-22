import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { createWorkflow, getWorkflowsByUserId } from '../services/workflowService';
import { Prisma } from '@prisma/client';

export const createWorkflowHandler = async (req: Request, res: Response, next: NextFunction) : Promise<Response | undefined>  => {
  try {
    const workflowData: Prisma.WorkFlowCreateInput = req.body;

    // Validação básica
    if (!workflowData.name || !workflowData.user) {
      return res.status(400).json({ message: 'Name and userId are required' });
    }

    const workflow = await createWorkflow(workflowData);
    res.status(201).json(workflow);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Tratamento de erros específicos do Prisma
      if (error.code === 'P2002') {
        return res.status(400).json({ message: 'A workflow with this name already exists for this user' });
      }
    }
    res.status(500).json({ message: 'Error creating workflow', error });
  }
};

export const getWorkflows = async (req: Request, res: Response, next: NextFunction) : Promise<Response | undefined> => {
  const { userId } = req.query;

  if (!userId || Array.isArray(userId)) {
    return res.status(400).json({ message: 'Valid user ID is required' });
  }

  try {
    const workflows = await getWorkflowsByUserId(Number(userId));
    res.json(workflows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workflows', error });
  }
};