import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      return {
        id: user._id,
        name: user.name,
        email: user.email
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      user: { id: user.id, name: user.name, email: user.email },
      access_token: this.jwtService.sign(payload),
    };
  }

}