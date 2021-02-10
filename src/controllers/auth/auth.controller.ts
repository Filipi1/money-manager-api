import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserAuth } from 'src/classes/user';
import { AuthService } from 'src/services/auth/auth.service';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post()
    async login(@Body() body) {
        var userAuth: UserAuth = new UserAuth();
        userAuth.user = body["user"]
        userAuth.password = body["password"]

        var result = await this.authService.auth(userAuth)

        if (!result) {
            throw new HttpException({code: HttpStatus.BAD_REQUEST, message: "Credênciais Inválidas"}, HttpStatus.BAD_REQUEST)
        }

        return result
    }
}
