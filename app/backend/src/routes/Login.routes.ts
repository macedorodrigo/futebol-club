import { Router } from 'express';
import LoginController from '../controllers/Login.Controller';

const authRouter = Router();
const loginController = new LoginController();

authRouter.post(
  '/',
  (req, res) => loginController.login(req, res),
);

authRouter.get(
  '/role',
  (req, res) => loginController.role(req, res),
);

export default authRouter;
