import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto, SignUpDto } from '../dto/auth.dto';
import { AuthService } from '../application/auth.service';
import { SignInPresenter, SignUpPresenter } from '../presenters/auth.presenter';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: SignUpDto) {
    const signUp = await this.authService.signUp(body);

    return new SignUpPresenter(signUp);
  }

  @Post('signin')
  async signIn(@Body() body: SignInDto) {
    const signIn = await this.authService.signIn(body);

    return new SignInPresenter(signIn);
  }
}
