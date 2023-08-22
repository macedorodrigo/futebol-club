import { Router } from 'express';
import TeamsRouter from './Teams.routes';
import LoginRouter from './Login.routes';
import MatchesRouter from './Matches.routes';

const router = Router();

router.use('/teams', TeamsRouter);
router.use('/login', LoginRouter);
router.use('/matches', MatchesRouter);

export default router;
