import { NextFunction, Request, Response } from 'express';
import { compareSync } from 'bcryptjs';
import Users from '../database/models/UsersModel';
import { verifyJwt } from '../utils/jwt';
import TeamsModel from '../database/models/TeamsModel';

const invalidEmail = 'Invalid email or password';

class loginValidations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: invalidEmail });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: invalidEmail });
    }
    next();
  }

  static async validateLoginDb(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (!(user && compareSync(password, user.dataValues.password))) {
      return res.status(401).json({ message: invalidEmail });
    }
    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      verifyJwt(authorization.split(' ')[1]);
    } catch {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }

  static async validateMatches(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const checkHomeTeam = await TeamsModel.findByPk(homeTeamId);
    const checkAwayTeam = await TeamsModel.findByPk(homeTeamId);

    if (checkHomeTeam === null || checkAwayTeam === null) {
      return res.status(404).json({
        message: 'There is no team with such id!',
      });
    }
    next();
  }
}

export default loginValidations;
