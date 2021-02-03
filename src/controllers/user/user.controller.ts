import { Controller, Get, HttpException, HttpStatus, Param, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
    constructor(private jwtService: JwtService, private userService: UserService) {}

    @Get(':id')
    async obterUsuario(@Req() req, @Param('id') identifier) {
        const token = req.headers["authorization"]
        
        await this.jwtService.verifyAsync(token).catch(e => {
            throw new HttpException("Acesso negado", HttpStatus.UNAUTHORIZED)
        })

        var user = await this.userService.findOneById(identifier).then(user => user)

        if (!user) {
            throw new HttpException("Nenhum usuário encontrado para essa solicitação", HttpStatus.NOT_FOUND)
        }

        return user
    }
}
