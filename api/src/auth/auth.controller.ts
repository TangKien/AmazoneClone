import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { NewUserDto } from 'src/user/dto/new-user.dto';
import { AuthService } from './auth.service';
import { ExisintingUserDto } from 'src/user/dto/existing-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: NewUserDto) {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: ExisintingUserDto): Promise<{ token: string }> {
    return this.authService.login(user);
  }
}
