import UsersModel from '../database/models/UsersModel';
import Login from '../Interfaces/Login';
import { ServiceResponseRole, ServiceResponseLogin } from '../Interfaces/ServiceResponse';
import { signJwt, verifyJwt } from '../utils/jwt';

export default class LoginService {
  constructor(
    private usersModel = UsersModel,
  ) { }

  public async login(user: Login): Promise<ServiceResponseLogin> {
    const login = await this.usersModel.findOne({ where: { email: user.email } });
    if (login) {
      const { id, email, password } = login;
      const payload = { id, email, password };
      const newToken = signJwt(payload);
      return { responseMessage: { token: newToken }, status: 200 };
    }
    return { responseMessage: 'Invalid email or password', status: 401 };
  }

  public async role(authorization:string): Promise<ServiceResponseRole> {
    try {
      const userAuthorization = verifyJwt(authorization.split(' ')[1]);
      if (typeof userAuthorization !== 'string') {
        const { email } = userAuthorization;
        const user = await this.usersModel.findOne({ where: { email } });
        if (user) {
          return { responseMessage: { role: user.role }, status: 200 };
        }
      }
      return { responseMessage: { role: 'invalid' }, status: 401 };
    } catch {
      return { responseMessage: { role: 'invalid' }, status: 401 };
    }
  }
}
