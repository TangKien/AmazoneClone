import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import "dotenv/config"
@Module({
  // imports: [MongooseModule.forRoot('mongodb://localhost:27017/amazon'),ProductModule],
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), ProductModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
