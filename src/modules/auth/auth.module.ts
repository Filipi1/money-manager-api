import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { JwtStrategy } from 'src/controllers/auth/jwt.strategy';
import { AuthService } from 'src/services/auth/auth.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              secretOrKeyProvider: () => configService.get("SECRET")  
            }),
            inject: [ConfigService]
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService, ConfigService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule { }
