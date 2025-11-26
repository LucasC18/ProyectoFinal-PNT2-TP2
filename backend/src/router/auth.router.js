import { Router } from 'express';
import UserController from '../controllers/User.js';
import { authenticateToken } from '../middleware/authentication.js';

const AuthRouter = Router();

AuthRouter.post('/register', UserController.register);
AuthRouter.post('/login', UserController.login);
AuthRouter.get('/profile', authenticateToken, UserController.profile);

export default AuthRouter;
