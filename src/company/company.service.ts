import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const existedCompany = await this.companyRepository.findOneBy({
        name: createCompanyDto.name,
      });
      if (existedCompany) {
        return new BadRequestException(`${existedCompany.name} already exists`);
      }
      const newCompany = this.companyRepository.create(createCompanyDto);
      return await newCompany.save();
    } catch (error) {
      return new InternalServerErrorException(
        `Create new company error: ${error.message}`,
      );
    }
  }

  async getUserCompany(userId: string) {
    try {
    } catch (error) {
      return new InternalServerErrorException(
        `Get user company error: ${error.message}`,
      );
    }
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
