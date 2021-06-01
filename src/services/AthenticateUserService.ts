import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/Users';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRespository = getRepository(User);

    const user = await usersRespository.findOne({
      where: { email }
    });

    if (!user) {
      throw new Error ('Incorrect email/password combination.');
    }

    //user.password -> Senha criptografada
    // password -> Senha  não-criptografada

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error ('Incorrect email/password combination.');
    }

    // Usuário Autenticado

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
