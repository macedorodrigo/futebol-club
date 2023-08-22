import { Request, Response } from 'express';
import TeamsService from '../services/Teams.Service';

export default class TeamController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async getAllTeams(req: Request, res: Response) {
    const teams = await this.teamsService.getAllTeams();
    return res.status(200).json(teams.data);
  }

  public async getTeamsById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamsService.getTeamsById(Number(id));
    if (team.status !== 'SUCCESSFUL') {
      return res.status(404).json(team.data);
    }
    return res.status(200).json(team.data);
  }
}
