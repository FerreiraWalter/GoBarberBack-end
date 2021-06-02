import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

import User from '../models/Users';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
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

    const token = sign({}, '8eac11bdbe52bcfb1c8f536badb68729', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
