import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() credentials: { email: string; password: string },
  ): Promise<{ id: number; access_token: string }> {
    return this.authService.login(credentials.email, credentials.password);
  }
}
