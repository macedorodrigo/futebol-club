import { Router } from 'express';
import LeaderBoardsController from '../Controller/LeaderBoards.Controller';

const authRouter = Router();

const leaderBoardController = new LeaderBoardsController();

authRouter.get(
  '/home',
  (req, res) => leaderBoardController.leaderBoardHome(req, res),
);

authRouter.get(
  '/away',
  (req, res) => leaderBoardController.leaderBoardAway(req, res),
);

authRouter.get(
  '/',
  (req, res) => leaderBoardController.leaderBoard(req, res),
);

export default authRouter;
