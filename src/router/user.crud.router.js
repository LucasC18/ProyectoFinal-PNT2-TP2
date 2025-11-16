import { Router } from 'express';
import { UserController } from '../controllers/User.js';
import { authenticateToken } from '../middleware/authentication.js';

const UserRouter = Router();

UserRouter.get('/select/:id', UserController.getById)
  .delete('/delete/:id', authenticateToken, UserController.deleteById)
  .post('/create', authenticateToken, UserController.createByJson)
  .patch('/update', authenticateToken, UserController.updateByJson);

export default UserRouter;
