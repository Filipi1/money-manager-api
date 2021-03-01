import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/classes/user.entity';
import { Repository } from 'typeorm';

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

    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async update(id: string, user: User) {
        return await this.userRepository.update(id, user);
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
