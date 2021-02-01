import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './services/user/user.service';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    JwtModule.register({secret: 'y67u39455yutx'}),
    UserModule
  ],
  controllers: [],
  providers: [UserService],
})
export class AppModule {}
