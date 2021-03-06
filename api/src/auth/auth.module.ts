import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from 'src/guards/jwt.guard';
import { JwtStrategy } from 'src/guards/jwt.strategy';

@Module({
  imports: [UserModule, JwtModule.registerAsync({useFactory: () => ({
    secret: 'secret',
    signOptions: {expiresIn: '3600s'}
  })})],
  providers: [AuthService, JwtGuard,JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
