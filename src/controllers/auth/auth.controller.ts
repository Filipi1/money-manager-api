import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserAuth } from 'src/classes/user.entity';
import { AuthService } from 'src/services/auth/auth.service';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post()
    @HttpCode(200)
    async login(@Body() userAuth: UserAuth) {
        return this.authService.auth(userAuth)
    }
}
