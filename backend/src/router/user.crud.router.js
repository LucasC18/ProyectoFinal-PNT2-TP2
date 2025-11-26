import { Router } from 'express';
import UserController from '../controllers/User.js';
import { authenticateToken } from '../middleware/authentication.js';
import role from '../middleware/role.js';

const UserCrudRouter = Router();

// Crear usuario (admin)
UserCrudRouter.post('/', authenticateToken, role('admin'), UserController.create);

// Actualizar usuario (admin)
UserCrudRouter.put('/:id', authenticateToken, role('admin'), UserController.update);

// Eliminar usuario (admin)
UserCrudRouter.delete('/:id', authenticateToken, role('admin'), UserController.remove);

export default UserCrudRouter;
