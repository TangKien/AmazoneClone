import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { NewUserDto } from 'src/user/dto/new-user.dto';
import { User } from 'src/user/user.interface';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: Readonly<NewUserDto>) {
      const {name , email , password} = user;
      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
          throw new BadRequestException('Email is taken');
      } 
      const hasedPassword = await this.hashPassword(password);

      const newUser = await this.userService.create(name , email, hasedPassword);
      return newUser
   }
}
