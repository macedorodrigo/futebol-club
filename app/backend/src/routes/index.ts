import { Router } from 'express';
import TeamsRouter from './Teams.router';

const router = Router();

router.use('/teams', TeamsRouter);

export default router;
