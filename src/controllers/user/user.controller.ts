import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/classes/user.entity';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async obterUsuario(@Param('id') identifier): Promise<User> {        
        var user = await this.userService.findOneById(identifier).then(user => user)
        
        if (user)
            user.password = null;

        if (!user) {
            throw new HttpException("Nenhum usuário encontrado para essa solicitação", HttpStatus.NOT_FOUND)
        }

        return user
    }

    @Post()
    async create(@Body() user: User) {

        return await this.userService.create(user);
    }
}
