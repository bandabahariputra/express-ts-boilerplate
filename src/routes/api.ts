import express from 'express';

import { AuthController } from '../controllers/auth.controller';
import { HomeController } from '../controllers/home.controller';
import { UserController } from '../controllers/user.controller';
import { auth } from '../middlewares/auth';

export const apiRouter = express.Router();

// home
apiRouter.get('/', HomeController.welcome);

// auth
apiRouter.post('/api/auth/register', AuthController.register);
apiRouter.post('/api/auth/login', AuthController.login);

// with authorization api
// user
apiRouter.get('/api/users/current', auth, UserController.getCurrentUser);
apiRouter.patch('/api/users/update', auth, UserController.update);
apiRouter.post(
  '/api/users/change-password',
  auth,
  UserController.changePassword,
);
