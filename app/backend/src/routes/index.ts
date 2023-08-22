import { Router } from 'express';
// import TeamsRouter from './TeamsRoutes';
// import LoginRouter from './LoginRoutes';

const router = Router();

router.get('/', (req, res) => res.json({ ok: true }));
// router.use('/teams', LoginRouter);
// router.use('/login', TeamsRouter);

export default router;
