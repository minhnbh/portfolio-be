import { Company } from 'src/company/entities/company.entity';
import {
  Entity,
  Column,
  Unique,
  OneToMany,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { DefaultEntity } from 'src/config/defaultEntity';
import { Role } from 'src/role/entities/role.entity';

@Entity()
@Unique(['email'])
export class User extends DefaultEntity {
  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar', { nullable: true })
  refreshToken: string;

  @ManyToOne(() => Role, (role) => role.user)
  @JoinColumn({ name: 'roleId' })
  roles: Role[];

  @OneToMany(() => Company, (company) => company.ownedBy, {
    cascade: false,
  })
  companies: Company[];

  @BeforeInsert()
  hashPassword() {
    if (this.password) {
      const salt = genSaltSync(10);
      this.password = hashSync(this.password, salt);
    }
  }

  async isAuthenticated(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }
}
