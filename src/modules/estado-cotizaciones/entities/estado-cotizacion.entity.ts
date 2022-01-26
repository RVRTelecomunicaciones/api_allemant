import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { Column, Entity } from 'typeorm';

@Entity('co_cotizacion_estado')
export class EstadoCotizacion extends SharedEntity {
  @Column({ type: 'varchar', nullable: false, length: 15, name: 'nombre' })
  nombre: string;
}
