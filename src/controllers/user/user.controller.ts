import { Controller, Get, HttpException, HttpStatus, Param, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async obterUsuario(@Param('id') identifier) {        
        var user = await this.userService.findOneById(identifier).then(user => user)
        
        if (user)
            user.password = null;

        if (!user) {
            throw new HttpException("Nenhum usuário encontrado para essa solicitação", HttpStatus.NOT_FOUND)
        }

        return user
    }
}
