import express from 'express';
import UserController from '../controllers/User.js';
import validateToken from '../auth/validateToken.js';

const UserAllRouter = express.Router();

UserAllRouter.get('/', validateToken, UserController.profile);

export default UserAllRouter;
