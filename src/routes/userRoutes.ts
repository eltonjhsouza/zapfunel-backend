import express from 'express';
import { userController } from '../controllers/userController';

const router = express.Router();

router.post('/', userController.createUser.bind(userController));
router.get('/:id', userController.getUser.bind(userController));
router.put('/:id', userController.updateUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));

export { router as userRouter };