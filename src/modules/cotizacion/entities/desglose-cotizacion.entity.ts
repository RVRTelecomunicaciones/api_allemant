import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Cotizacion } from './cotizacion.entity';

@Entity('co_desglose')
export class DesgloseCotizacion extends SharedEntity {
  @Index()
  @Column({
    type: 'varchar',
    length: 50,
    name: 'name',
    nullable: false,
  })
  name: string;
  /*
  @OneToMany(() => Cotizacion, (cotizacion) => cotizacion.desglose)
  cotizaciones: Cotizacion[]; */
}
