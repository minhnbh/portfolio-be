import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ISignInParams } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async signIn(@Body() body: ISignInParams) {
    return await this.authService.signIn(body);
  }
}
