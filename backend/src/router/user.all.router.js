import { Router } from 'express';
import UserController from '../controllers/User.js';
import { authenticateToken } from '../middleware/authentication.js';
import role from '../middleware/role.js';

const UserAllRouter = Router();

// GET /users  (solo admin)
UserAllRouter.get('/', authenticateToken, role('admin'), UserController.getAll);

// GET /users/:id  (admin)
UserAllRouter.get('/:id', authenticateToken, role('admin'), UserController.getById);

export default UserAllRouter;
