import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserDetails } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }
}
