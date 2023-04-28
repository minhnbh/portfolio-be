import { DefaultEntity } from 'src/config/defaultEntity';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  ManyToMany,
  ManyToOne,
  Unique,
  JoinTable,
  JoinColumn,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Company extends DefaultEntity {
  @Column('varchar')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { nullable: true })
  phone: string;

  @Column('varchar', { nullable: true })
  address: string;

  @Column('varchar', { nullable: true })
  logo: string;

  @ManyToMany(() => Project, (project) => project.companies)
  @JoinTable()
  projects: Project[];

  @ManyToOne(() => User, (user) => user.companies)
  @JoinColumn({ name: 'userId' })
  ownedBy: User;
}
