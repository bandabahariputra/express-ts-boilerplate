import express from 'express';

import { AuthController } from '../controllers/auth.controller';
import { UserController } from '../controllers/user.controller';
import { auth } from '../middlewares/auth';

export const apiRouter = express.Router();

// auth
apiRouter.post('/api/auth/register', AuthController.register);
apiRouter.post('/api/auth/login', AuthController.login);

// auth api
apiRouter.use(auth);

// user
apiRouter.get('/api/users/current', UserController.getCurrentUser);
apiRouter.patch('/api/users/update', UserController.update);
apiRouter.post('/api/users/change-password', UserController.changePassword);
