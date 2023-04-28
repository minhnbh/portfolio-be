import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ISignInParams } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: ISignInParams) {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        return new UnauthorizedException('User not found');
      }
      const isValid = await user.isAuthenticated(password);
      if (!isValid) {
        return new UnauthorizedException('Email or password is invalid');
      }
      const payload = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '180d',
      });
      user.refreshToken = refreshToken;

      return {
        user: payload,
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken,
      };
    } catch (error) {
      return new InternalServerErrorException(
        `Sign in error: ${error.message}`,
      );
    }
  }
}
