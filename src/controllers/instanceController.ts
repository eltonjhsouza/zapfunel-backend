import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const createInstance = async (req: Request, res: Response) => {
  try {
    const { instanceName, owner, profileName, status, serverUrl, userId } = req.body;
    const instance = await prisma.instance.create({
      data: {
        instanceName,
        owner,
        profileName,
        status,
        serverUrl,
        userId,
      },
    });
    res.status(201).json(instance);
  } catch (error) {
    res.status(400).json({ message: 'Error creating instance', error });
  }
};

export const getInstances = async (req: Request, res: Response) => {
  try {
    const instances = await prisma.instance.findMany();
    res.json(instances);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching instances', error });
  }
};