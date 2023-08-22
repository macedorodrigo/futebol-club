import { Router } from 'express';
import TeamsRouter from './Teams.routes';
import LoginRouter from './Login.routes';
import MatchesRouter from './Matches.routes';
import LeaderBoardsRouter from './LeaderBoards.routes';

const router = Router();

router.use('/teams', TeamsRouter);
router.use('/login', LoginRouter);
router.use('/matches', MatchesRouter);
router.use('/leaderboard', LeaderBoardsRouter);

export default router;
