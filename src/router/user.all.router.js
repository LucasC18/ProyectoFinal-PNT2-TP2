import express from 'express';
import { UserController } from '../controllers/User.js';
import { authenticateToken } from '../middleware/authentication.js';

const UserAllRouter = express.Router();

UserAllRouter.get('/', authenticateToken, UserController.getAllUsers);

export default UserAllRouter;
