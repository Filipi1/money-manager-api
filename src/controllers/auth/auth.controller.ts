import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserAuth } from 'src/classes/user';
import { AuthService } from 'src/services/auth/auth.service';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post()
    async login(@Body() userAuth: UserAuth) {
        return await this.authService.auth(userAuth)
    }
    
}
