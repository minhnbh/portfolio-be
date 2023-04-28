import { DefaultEntity } from 'src/config/defaultEntity';
import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, JoinTable, ManyToMany, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Category extends DefaultEntity {
  @Column({ length: 128 })
  name: string;

  @Column({ nullable: true, length: 512 })
  description: string;

  @Column({ nullable: true, default: null })
  parentId: string;

  @ManyToMany(() => Project, (project) => project.categories)
  @JoinTable()
  projects: Project[];
}
