import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getPaginationData } from 'src/common/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existedUser = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });
      if (existedUser) {
        return new BadRequestException(`${existedUser.email} already exists`);
      }
      const newUser = this.userRepository.create(createUserDto);
      const savedUser = await newUser.save();
      return Object.assign({}, savedUser, { password: undefined });
    } catch (error) {
      return new InternalServerErrorException(
        `Create user error: ${error.message}`,
      );
    }
  }

  async findAll(page: number, limit: number) {
    const data = await this.userRepository.find();
    return getPaginationData(data, page, limit);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
