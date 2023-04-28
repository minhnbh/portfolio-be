import { Category } from 'src/category/entities/category.entity';
import { Company } from 'src/company/entities/company.entity';
import { DefaultEntity } from 'src/config/defaultEntity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Project extends DefaultEntity {
  @Column({ length: 128 })
  name: string;

  @Column({ nullable: true, length: 512 })
  description: string;

  @Column({ nullable: true, type: 'text' })
  content: string;

  @ManyToMany(() => Category, (category) => category.projects)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Company, (company) => company.projects)
  @JoinTable()
  companies: Company[];
}
