import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './services/user/user.service';
import { UserModule } from './modules/user/user.module';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [
    JwtModule.register({secret: 'y67u39455yutx'}),
    UserModule
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService],
})
export class AppModule {}
