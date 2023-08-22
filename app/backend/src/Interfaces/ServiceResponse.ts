import { JwtPayload } from 'jsonwebtoken';

export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL',
  data: T
};

export type ServiceResponseLogin = {
  responseMessage: string | JwtPayload,
  status: number,
};

export type ServiceResponseRole = {
  responseMessage: {
    role: string,
  },
  status:number,
};

export type returnPs = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance:number,
  efficiency: string,
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
