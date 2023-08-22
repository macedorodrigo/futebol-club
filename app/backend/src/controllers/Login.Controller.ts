import { Request, Response } from 'express';
// import { ServiceResponseRole, ServiceResponseLogin } from '../Interfaces/ServiceResponse';
import { ServiceResponseLogin } from '../Interfaces/ServiceResponse';
import LoginService from '../services/Login.Service';
import Token from '../Interfaces/Token';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) { }

  public async login(req: Request, res: Response): Promise<ServiceResponseLogin | Token | void> {
    const user = req.body;
    const { responseMessage, status } = await this.loginService.login(user);
    res.status(status).json(responseMessage);
  }

  public async role(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (authorization) {
      const { responseMessage, status } = await this.loginService.role(authorization);
      return res.status(status).json(responseMessage);
    }
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
