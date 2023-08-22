import { Router } from 'express';
import TeamsRouter from './Teams.routes';
import LoginRouter from './Login.routes';

const router = Router();

router.use('/teams', TeamsRouter);
router.use('/login', LoginRouter);

export default router;
