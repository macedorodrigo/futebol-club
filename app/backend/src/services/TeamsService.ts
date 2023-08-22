import ITeams from '../Interfaces/Teams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamsModel from '../database/models/TeamsModel';

export default class TeamsService {
  private teamsModel = TeamsModel;
  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamsById(id: string): Promise<ServiceResponse<ITeams>> {
    const teamsId = await this.teamsModel.findByPk(id);
    if (!teamsId) return { status: 'NOT_FOUND', data: { message: `teamsId ${id} not found` } };
    return { status: 'SUCCESSFUL', data: teamsId };
  }
}
