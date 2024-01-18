import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExist = await this.userRepository.existsBy({
      email: createUserDto.email,
    });

    if (userExist)
      throw new HttpException('Email já cadastrado!', HttpStatus.BAD_REQUEST);

    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException(
        `Usuário com ID ${userId} não encontrado!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException(
        `Usuário com email ${email} não encontrado!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async update(userId: number, payload: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException(
        `Usuário com ID ${userId} não encontrado!`,
        HttpStatus.NOT_FOUND,
      );
    }

    const newUser = {
      ...user,
      ...payload,
      updatedAt: new Date(),
    };

    return this.userRepository.save(newUser);
  }
  async profileImage(userId: number, file): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException(
        `Usuário com ID ${userId} não encontrado!`,
        HttpStatus.NOT_FOUND,
      );
    }

    user.profileImagePath = file.path;
    user.updatedAt = new Date();

    return await this.userRepository.save(user);
  }
}
