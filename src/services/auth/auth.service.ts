import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserAuth } from 'src/classes/user';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async auth(userAuth: UserAuth) {
        return await this.userService.findOne(userAuth.user).then((user: UserAuth) => {
            if (user == null)
                return user
            
            if (user.user == userAuth.user && user.password == userAuth.password) {
                
                var token = this.jwtService.sign(user);
                
                return { user: user, token: token }
            }

            return null
        })
    }
}
