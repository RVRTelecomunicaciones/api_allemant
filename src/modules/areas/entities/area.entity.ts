import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Area extends SharedEntity {
  @Column({ type: 'varchar', nullable: false, length: 50, name: 'nombre' })
  nombre: string;
}
