import { returnPs } from '../Interfaces/ServiceResponse';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

export default class LeaderBoardService {
  private teamsModel = TeamsModel;
  private matchesModel = MatchesModel;

  public async leaderBoardHome(sort:string): Promise<returnPs[]> {
    const allTeams = await this.teamsModel.findAll();
    const allMatches = await this.matchesModel.findAll();

    const resultPromises = allTeams.map(async (t) => {
      const thisTeamMatches = allMatches.filter((match) => t.dataValues.id
      === match.dataValues.homeTeamId && match.dataValues.inProgress === false);

      const result = await LeaderBoardService.returnPs(t, thisTeamMatches, 'home');

      return result;
    });
    const results = await Promise.all(resultPromises);
    if (sort === 'unsorted') return results;
    const resultsSorted = await LeaderBoardService.setSort(results);
    return resultsSorted;
  }

  static async returnPs(team:TeamsModel, matches:MatchesModel[], place:string):Promise<returnPs> {
    const totalPoints = await LeaderBoardService.totalPoints(matches, place);
    const totalGames = await LeaderBoardService.totalGames(matches);
    const goalsFavor = await LeaderBoardService.goalsFavor(matches, place);
    const goalsOwn = await LeaderBoardService.goalsOwn(matches, place);
    return { name: team.dataValues.teamName,
      totalPoints,
      totalGames,
      totalVictories: await LeaderBoardService.totalVicories(matches, place),
      totalDraws: await LeaderBoardService.totalDraws(matches),
      totalLosses: await LeaderBoardService.totalLosses(matches, place),
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
  }

  static async totalPoints(matches:MatchesModel[], place:string):Promise<number> {
    let points = 0;
    matches.forEach((match:MatchesModel) => {
      if (place === 'home') {
        if (match.homeTeamGoals > match.awayTeamGoals) points += 3;
        if (match.homeTeamGoals === match.awayTeamGoals) points += 1;
      } else {
        if (match.homeTeamGoals < match.awayTeamGoals) points += 3;
        if (match.homeTeamGoals === match.awayTeamGoals) points += 1;
      }
    });
    return points;
  }

  static async totalGames(matches:MatchesModel[]):Promise<number> { return matches.length; }

  static async totalVicories(matches:MatchesModel[], place:string):Promise<number> {
    let victories = 0;
    matches.forEach((match:MatchesModel) => {
      if (place === 'home') {
        if (match.homeTeamGoals > match.awayTeamGoals) victories += 1;
      } else if (match.homeTeamGoals < match.awayTeamGoals) victories += 1;
    });
    return victories;
  }

  static async totalDraws(matches:MatchesModel[]):Promise<number> {
    let draws = 0;
    matches.forEach((match:MatchesModel) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        draws += 1;
      }
    });
    return draws;
  }

  static async totalLosses(matches:MatchesModel[], place:string):Promise<number> {
    let losses = 0;
    matches.forEach((match:MatchesModel) => {
      if (place === 'home') {
        if (match.homeTeamGoals < match.awayTeamGoals) losses += 1;
      } else if (match.homeTeamGoals > match.awayTeamGoals) losses += 1;
    });
    return losses;
  }

  static async goalsFavor(matches:MatchesModel[], place:string):Promise<number> {
    let Goals = 0;
    matches.forEach((match:MatchesModel) => {
      if (place === 'home') {
        Goals += match.homeTeamGoals;
      } else { Goals += match.awayTeamGoals; }
    });
    return Goals;
  }

  static async goalsOwn(matches:MatchesModel[], place:string):Promise<number> {
    let Goals = 0;
    matches.forEach((match:MatchesModel) => {
      if (place === 'home') {
        Goals += match.awayTeamGoals;
      } else { Goals += match.homeTeamGoals; }
    });
    return Goals;
  }

  static async setSort(matches:returnPs[]):Promise<returnPs[]> {
    const sorted = matches.sort((a, b) => {
      if (+b.totalPoints !== +a.totalPoints) {
        return +b.totalPoints - +a.totalPoints;
      }
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      if (b.goalsFavor !== a.goalsFavor) {
        return b.goalsFavor - a.goalsFavor;
      }
      return parseFloat(b.efficiency) - parseFloat(a.efficiency);
    });
    return sorted;
  }
}
