import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Enterprise } from '../../enterprise/entities/enterprise.entity';
@Entity('responsibles')
export class Responsible {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.responsibles, {
    nullable: false,
  })
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: Enterprise;
}
