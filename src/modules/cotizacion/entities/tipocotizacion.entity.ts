import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Cotizacion } from './cotizacion.entity';
@Entity('co_tipo_cotizacion')
export class TipoCotizacion extends SharedEntity {
  @Index()
  @Column({
    type: 'varchar',
    length: 50,
    name: 'name',
    nullable: false,
  })
  name: string;

  /* @OneToMany(() => Cotizacion, (cotizacion) => cotizacion.tipocotizacion)
  cotizaciones: Cotizacion[]; */
}
