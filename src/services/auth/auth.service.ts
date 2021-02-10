import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserAuth } from 'src/classes/user';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async auth(userAuth: UserAuth) {
        const response = this.validate(userAuth).then((userData) => {
            if (!userData)
                return null
            let payload = `${userData.id}`;
            const accessToken = this.jwtService.sign(payload);

            return {
                status: 200,
                data: {
                    user: userData,
                    access: {
                        expires_in: 3600,
                        token: accessToken,
                        user_id: payload,
                    }
                }
            }
        })

        if (!response)
            throw new HttpException("Não autorizado", HttpStatus.UNAUTHORIZED)

        return response
    }

    async validate(userAuth: UserAuth) : Promise<User> {
        return await this.userService.findOne(userAuth.user);
    }
}
