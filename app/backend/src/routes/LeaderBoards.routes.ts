import { Router } from 'express';
import LeaderBoardsController from '../Controller/LeaderBoards.Controller';

const authRouter = Router();

const leaderBoardController = new LeaderBoardsController();

authRouter.get(
  '/home',
  (req, res) => leaderBoardController.leaderBoardHome(req, res),
);

export default authRouter;
