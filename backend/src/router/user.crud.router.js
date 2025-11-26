import { Router } from 'express';
import UserController from '../controllers/User.js';
import validateToken from '../auth/validateToken.js';

const UserRouter = Router();

export default UserRouter;
