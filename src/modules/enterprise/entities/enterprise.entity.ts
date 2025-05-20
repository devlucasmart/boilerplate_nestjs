import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Responsible } from '../../responsible/entities/responsible.entity';
@Entity('enterprises')
export class Enterprise {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  cnpj: string;

  @OneToMany(() => Product, (product) => product.enterprise)
  products: Product[];

  @OneToMany(() => Responsible, (responsible) => responsible.enterprise)
  responsibles: Responsible[];
}
