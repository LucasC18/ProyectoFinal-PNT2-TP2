import { Router } from 'express';
import UserController from '../controllers/User.js';

const AuthRouter = Router();

AuthRouter.post('/register', UserController.register);
AuthRouter.post('/login', UserController.login);
AuthRouter.get('/profile', UserController.profile);

export default AuthRouter;
