import { Prisma } from '@prisma/client';
import prisma from '../config/prisma';
import crypto from 'crypto';

export const getWorkflowsByUserId = async (userId: number) => {
  return await prisma.workflow.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'asc',
    }
  });
};

export const createWorkflow = async (data: Prisma.workflowCreateInput) => {
  data.updatedAt = new Date();
  data.workflowId = crypto.randomBytes(16).toString('hex').toUpperCase();
  return await prisma.workflow.create({
    data,
  });
};
