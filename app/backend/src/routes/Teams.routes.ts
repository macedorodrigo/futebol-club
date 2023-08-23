import { Router } from 'express';
import TeamsController from '../Controller/Teams.Controller';

const authRouter = Router();
const teamsController = new TeamsController();

authRouter.get('/', (req, res) => teamsController.getAllTeams(req, res));
authRouter.get('/:id', (req, res) => teamsController.getTeamsById(req, res));

export default authRouter;
