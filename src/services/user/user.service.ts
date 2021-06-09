import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { User } from 'src/classes/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async findOne(user: string): Promise<User> {
        return await this.userRepository.findOne({ user });
    }

    async create({ name, user, password }: User): Promise<User> {
        const hashPassword = await hash(password, 8);

        const createUser = await this.userRepository.save({
            name,
            user,
            password: hashPassword
        });

        return createUser;
    }

    async update(id: string, user: User) {
        return await this.userRepository.update(id, user);
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
