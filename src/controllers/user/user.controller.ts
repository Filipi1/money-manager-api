import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/classes/user.entity';
import { UserService } from 'src/services/user/user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async obterUsuario(@Param('id') identifier, @Req() request): Promise<User> {

        if (request.user.id != identifier)
            throw new HttpException("Você não possui permissão para isso.", HttpStatus.UNAUTHORIZED)

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

    @Put(':id')
    async update(@Param('id') id: string, @Body() user: User) {
        if (Number(id) !== user.id) {
            throw new HttpException("Os id's informados são diferentes", HttpStatus.NOT_FOUND)
        }

        return this.userService.update(id, user);
    }

    @Delete(':id')
    async remove(@Param('id') id) {

        var user = await this.userService.findOneById(id).then(user => user);

        if (!user) {
            throw new HttpException("Nenhum usuário encontrado para essa solicitação", HttpStatus.NOT_FOUND)
        }

        await this.userService.remove(id);
    }
}
