import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { Column, Entity } from 'typeorm';

@Entity('co_cotizacion_tipo')
export class TipoCotizacion extends SharedEntity {
  @Column({ type: 'varchar', nullable: false, length: 10, name: 'nombre' })
  nombre: string;
}
