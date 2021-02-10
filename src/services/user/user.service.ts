import { Injectable } from '@nestjs/common';
import { User, UserAuth } from 'src/classes/user';

@Injectable()
export class UserService {
    private readonly users: User[] = [
        {
            id: 0,
            user: 'filipi1',
            password: '12345678',
            name: 'Filipe Braga',
        },
        {
            id: 1,
            user: 'marcilio',
            password: '12345678',
            name: 'Maurílio Lucena',
        },
    ];

    async findOneById(id: number): Promise<User | null> {
        var user = await this.users.find(user => user.id == id);
        return user
    }

    async findOne(username: string): Promise<User | null> {
        var user = await this.users.find(user => user.user === username);
        return user
    }
}
