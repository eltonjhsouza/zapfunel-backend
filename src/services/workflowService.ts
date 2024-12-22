import { Prisma } from '@prisma/client';
import prisma from '../config/prisma';

export const getWorkflowsByUserId = async (userId: number) => {
  return await prisma.workFlow.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'asc',
    }
  });
};

export const createWorkflow = async (data: Prisma.WorkFlowCreateInput) => {
  return await prisma.workFlow.create({
    data,
  });
};
