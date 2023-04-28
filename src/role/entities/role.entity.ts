import { DefaultEntity } from 'src/config/defaultEntity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Role extends DefaultEntity {
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.roles)
  user: User;
}
