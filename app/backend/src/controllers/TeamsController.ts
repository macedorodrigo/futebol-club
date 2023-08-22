import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  async getAllTeams(_req: Request, res: Response) {
    const teams = await this.teamsService.getAllTeams();
    return res.status(200).json(teams.data);
  }

  async getTeamsById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamsService.getTeamsById(id);
    if (team.data.message) return res.status(404).json(team.data);
    return res.status(200).json(team.data);
  }
}
