import { Request, Response } from 'express';
import LeaderBoardsService from '../services/LeaderBoards.Service';

export default class LeaderboardController {
  constructor(
    private leaderBoardsService = new LeaderBoardsService(),
  ) { }

  public async leaderBoardHome(_req: Request, res: Response) {
    const leaderBoardHome = await this.leaderBoardsService.leaderBoardHome('sorted');
    return res.status(200).json(leaderBoardHome);
  }
}
