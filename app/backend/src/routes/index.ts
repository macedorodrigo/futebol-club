import { Router } from 'express';
import TeamsRouter from './Teams.routes';

const router = Router();

router.use('/teams', TeamsRouter);

export default router;
