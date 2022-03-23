import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { NewUserDto } from 'src/user/dto/new-user.dto';
import { ExisintingUserDto } from 'src/user/dto/existing-user.dto';
import { User } from 'src/user/user.interface';
import { NotFoundError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: Readonly<NewUserDto>) {
    const { name, email, password } = user;
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email is taken');
    }
    const hasedPassword = await this.hashPassword(password);

    const newUser = await this.userService.create(name, email, hasedPassword);
    return newUser;
  }

  async doesPasswordMatch(
    password: string,
    hasedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hasedPassword);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    const doesUserExist = !!user;

    if (!doesUserExist) {
      throw new NotFoundException('This email doesnt exist');
    }

    const doestPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );
    if (!doestPasswordMatch) {
      throw new BadRequestException('Password is not correct');
    }

    return user;
  }

  async login(existingUser: ExisintingUserDto): Promise<{ token: string }> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user) {
    }

    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }
}
