import { Router } from 'express';
import LoginController from '../controllers/Login.Controller';
import LoginValidation from '../middlewares/LoginValidation';

const authRouter = Router();
const loginController = new LoginController();

authRouter.post(
  '/',
  LoginValidation.validateLogin,
  LoginValidation.validateLoginDb,
  (req, res) => loginController.login(req, res),
);

authRouter.get(
  '/role',
  LoginValidation.validateToken,
  (req, res) => loginController.role(req, res),
);

export default authRouter;
