import { Router } from 'express';
import MatchesController from '../controllers/Matches.Controller';
import LoginValidations from '../middlewares/LoginValidation';

const authRouter = Router();
const matchesController = new MatchesController();

authRouter.get(
  '/',
  (req, res) => matchesController.getAllMatches(req, res),
);

authRouter.patch(
  '/:id/finish',
  LoginValidations.validateToken,
  (req, res) => matchesController.matchesIdFinish(req, res),
);

authRouter.patch(
  '/:id',
  LoginValidations.validateToken,
  (req, res) => matchesController.matchesId(req, res),
);

authRouter.post(
  '/',
  LoginValidations.validateToken,
  LoginValidations.validateMatches,
  (req, res) => matchesController.createMatches(req, res),
);

export default authRouter;
