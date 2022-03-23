import { Body, Controller, Post } from '@nestjs/common';
import { NewUserDto } from 'src/user/dto/new-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: NewUserDto) {
    return this.authService.register(user);
  }
}
