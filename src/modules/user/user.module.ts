import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/classes/user.entity';
import { UserController } from 'src/controllers/user/user.controller';
import { UserService } from 'src/services/user/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }
