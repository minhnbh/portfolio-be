import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Role } from './entities/role.entity';

@Module({
  controllers: [RoleController],
  imports: [TypeOrmModule.forFeature([Role]), ConfigModule],
  providers: [RoleService],
})
export class RoleModule {}
