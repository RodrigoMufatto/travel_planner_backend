import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignUpDto) {
    return await this.authService.signup(body);
  }

  @Post('signin')
  async signin(@Body() body: SignInDto) {
    return await this.authService.signin(body);
  }
}
