import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { Column, Entity } from 'typeorm';

@Entity('coor_coordinacion_estado')
export class EstadoCoordinacion extends SharedEntity {
  @Column({ type: 'varchar', nullable: false, length: 50, name: 'nombre' })
  nombre: string;
}
