import { Router, Request, Response } from 'express';
import TeamsController from '../controllers/TeamsController';

const router = Router();
const teamController = new TeamsController();

router.get('/', (req: Request, res: Response) => teamController.getAllTeams(req, res));
router.get('/:id', (req: Request, res: Response) => teamController.getTeamsById(req, res));

export default router;
