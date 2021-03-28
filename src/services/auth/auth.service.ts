import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserAuth } from 'src/classes/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async auth(userAuth: UserAuth) {
        return this.validate(userAuth).then((userData) => {
            if (!userData)
                throw new HttpException("Credênciais Inválidas", HttpStatus.UNAUTHORIZED)
            
            let payload = {
                id: userData.id,
                nome: userData.name
            };
            const accessToken = this.jwtService.sign(payload, {expiresIn: 3600});

            userData.password = null
            return {
                status: 200,
                data: {
                    user: userData,
                    access: {
                        expires_in: 3600,
                        token: accessToken,
                    }
                }
            }
        })
    }

    async validate(userAuth: UserAuth) : Promise<User> {
        return this.userService.findOne(userAuth.user);
    }
}
