import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { Column, Entity } from 'typeorm';

@Entity('co_desglose')
export class Desglose extends SharedEntity {
  @Column({ type: 'varchar', nullable: false, length: 20, name: 'nombre' })
  nombre: string;
}
