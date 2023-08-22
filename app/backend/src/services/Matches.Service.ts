import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

export default class MatchesService {
  private matchesModel = MatchesModel;
  private teamsModel = TeamsModel;
  public async getAllMatches() {
    const matchesList = await this.matchesModel.findAll({
      include: [
        { model: this.teamsModel,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: this.teamsModel,
          as: 'awayTeam',
          attributes: ['teamName'],
        }],
      raw: true,
      nest: true,
    });
    return matchesList;
  }

  public async allMatchesFilter(boolean:string) {
    const matchesList = await this.getAllMatches();
    const test = boolean === 'true';
    const matchesListFiltered = matchesList
      .filter((match) => +match.inProgress === +test);
    return matchesListFiltered;
  }

  public async matchesIdFinish(id:string) {
    const matchesIdFinish = await this.matchesModel.findByPk(+id);
    await matchesIdFinish?.update({ inProgress: false }, { where: { inProgress: true } });
    return 'Finished';
  }

  public async matchesId(id:string, homeTeamGoals:number, awayTeamGoals:number) {
    const matchesId = await this.matchesModel.findByPk(+id);
    await matchesId?.update({ homeTeamGoals, awayTeamGoals });
    return 'Finished updating Match Goals';
  }

  public async createMatches(
    homeTeamId:number,
    homeTeamGoals:number,
    awayTeamId: number,
    awayTeamGoals:number,
  ) {
    const inProgress = true;
    const matches = await this.matchesModel
      .create({ homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress });
    return matches;
  }
}
