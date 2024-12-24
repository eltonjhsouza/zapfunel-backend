import prisma from '../config/prisma';
import { Prisma, instances } from '@prisma/client';

export const createInstance = async (data: Prisma.instancesCreateInput): Promise<instances> => {
  return await prisma.instances.create({
    data,
  });
};

export const getInstancesByUserId = async (userId: number): Promise<instances[]> => {
  return await prisma.instances.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getInstanceById = async (id: number): Promise<instances | null> => {
  return await prisma.instances.findUnique({
    where: {
      id,
    },
  });
};

export const updateInstance = async (id: number, data: Prisma.instancesCreateInput): Promise<instances> => {
  return await prisma.instances.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteInstance = async (id: number): Promise<instances> => {
  return await prisma.instances.delete({
    where: {
      id,
    },
  });
};

export const getInstanceByName = async (instanceName: string): Promise<instances | null> => {
  return await prisma.instances.findFirst({
    where: {
      instanceName: instanceName,
    },
  });
}
