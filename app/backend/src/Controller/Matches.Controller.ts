import { Request, Response } from 'express';
import MatchesService from '../Service/Matches.Service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    try {
      const query = req.query.inProgress;
      if (query && typeof query === 'string') {
        const serviceResponse = await this.matchesService.allMatchesFilter(query);
        return res.status(200).json(serviceResponse);
      }
    } catch {
      return res.status(400).json('notfound');
    }
    const serviceResponse = await this.matchesService.getAllMatches();
    return res.status(200).json(serviceResponse);
  }

  public async matchesIdFinish(req: Request, res: Response) {
    const { id } = req.params;
    if (id) {
      const matchesIdFinish = await this.matchesService.matchesIdFinish(id);
      return res.status(200).json({ message: matchesIdFinish });
    }
  }

  public async matchesId(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    if (id) {
      const matchesId = await this.matchesService
        .matchesId(id, homeTeamGoals, awayTeamGoals);
      return res.status(200).json({ message: matchesId });
    }
  }

  public async createMatches(req: Request, res: Response) {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;
    const createMatches = await this.matchesService
      .createMatches(+homeTeamId, +homeTeamGoals, +awayTeamId, +awayTeamGoals);
    return res.status(201).json(createMatches);
  }
}
