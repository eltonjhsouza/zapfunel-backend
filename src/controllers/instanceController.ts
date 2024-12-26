import { Request, Response } from 'express';
import * as instanceService from '../services/instanceService';
import * as evolutionApiService from '../services/evolutionApiService';
import * as userService from '../services/userService';
import crypto from 'crypto';

interface Iinstance {
  instanceName: string | null;
  token: string | null;
  qrcode: boolean;
}

const generateHash = () => {
return crypto.randomBytes(16).toString('hex').toUpperCase();
};


export const createInstance = async (req: Request, res: Response) => {
  try {
    const { userId, instanceName, owner, profileName, status, serverUrl } = req.body;

    // Check if the user exists
    const user = await userService.getUserById(Number(userId));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the instance data
    const data = {
      userId: user.id,
      instanceName,
      owner,
      profileName,
      status,
      serverUrl,
      updatedAt: new Date(),
    };

    // Create the local instance
    const localInstance = await instanceService.createInstance(data);

    const payloadInstance: Iinstance = {
      instanceName: localInstance.instanceName,
      token: generateHash(),
      qrcode: true,
    }
    // Create instance in Evolution API
    const evolutionInstance = await evolutionApiService.createEvolutionInstance(payloadInstance);

    console.log(evolutionInstance)
    // Update the local instance with information from Evolution API
    const updatedInstance = await instanceService.updateInstance(localInstance.id, {
      instanceId: evolutionInstance.instance.instanceId,
      apiKey: evolutionInstance.hash.apikey,
      userId: localInstance.userId,
      updatedAt: new Date(),
    });

    res.status(201).json(evolutionInstance);
  } catch (error) {
    console.error('Error creating instance:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error creating instance', error: error.message });
    } else {
      res.status(500).json({ message: 'Error creating instance', error: 'An unknown error occurred' });
    }
  }
};

export const connectionState = async (req: Request, res: Response) => {
  try {
    const { instanceName } = req.params;
    const instance = await instanceService.getInstanceByName(instanceName);

    if (!instance) {
      return res.status(404).json({ message: 'Instance not found' });
    }

    const response = await evolutionApiService.getConnectionState(instance.instanceName, instance.apiKey);
    res.json(response);
  } catch (error) {
    console.error('Error fetching instance state:', error);
    res.status(500).json({ message: 'Error fetching instance state', error });
  }
}

export const getInstances = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId || Array.isArray(userId)) {
      return res.status(400).json({ message: 'Valid user ID is required' });
    }

    const instances = await instanceService.getInstancesByUserId(Number(userId));
    res.json(instances);
  } catch (error) {
    console.error('Error fetching instances:', error);
    res.status(500).json({ message: 'Error fetching instances', error });
  }
};

export const getInstance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const instance = await instanceService.getInstanceById(Number(id));

    if (!instance) {
      return res.status(404).json({ message: 'Instance not found' });
    }

    res.json(instance);
  } catch (error) {
    console.error('Error fetching instance:', error);
    res.status(500).json({ message: 'Error fetching instance', error });
  }
};

export const updateInstance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedInstance = await instanceService.updateInstance(Number(id), updateData);
    res.json(updatedInstance);
  } catch (error) {
    console.error('Error updating instance:', error);
    res.status(500).json({ message: 'Error updating instance', error });
  }
};

export const deleteInstance = async (req: Request, res: Response) => {
  try {
    const { instanceName } = req.params;
    const instance = await instanceService.getInstanceByName(instanceName);

    if (!instance) {
      return res.status(404).json({ message: 'Instance not found' });
    }

    await instanceService.softDeleteInstance(instance.id);

    await evolutionApiService.deleteInstance(instance?.instanceName, instance?.apiKey);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting instance:', error);
    res.status(500).json({ message: 'Error deleting instance', error });
  }
};

export const logoutInstance = async (req: Request, res: Response) => {
  try {
    const { instanceName } = req.params;
    const instance = await instanceService.getInstanceByName(instanceName);

    if (!instance) {
      return res.status(404).json({ message: 'Instance not found' });
    }

    const response = await evolutionApiService.logoutInstance(instance.instanceName, instance.apiKey);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting instance:', error);
    res.status(500).json({ message: 'Error deleting instance', error });
  }
};
