import { Request, Response } from 'express';
import * as userService from '../services/userService';

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await userService.createUser({ name, email, password });
      res.status(201).json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user', error });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(Number(id));
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Error fetching user', error });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const updatedUser = await userService.updateUser(Number(id), { name, email, password });
      res.json({ id: updatedUser.id, name: updatedUser.name, email: updatedUser.email });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error updating user', error });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await userService.deleteUser(Number(id));
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Error deleting user', error });
    }
  }
}

export const userController = new UserController();