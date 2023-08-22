import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const authRouter = Router();
const teamController = new TeamsController();

authRouter.get('/', (req: any, res: any) => teamController.getAllTeams(req, res));
authRouter.get('/:id', (req: any, res: any) => teamController.getTeamsById(req, res));

export default authRouter;
