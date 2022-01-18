import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DesgloseCotizacion } from './desglose-cotizacion.entity';
@Entity('cotizacion')
export class Cotizacion extends SharedEntity {
  @Index()
  @Column({
    type: 'bigint',
  })
  codigo: number;

  @Column({
    type: 'tinyint',
  })
  nro_informes: number;

  @Column({ select: false, default: false })
  actualizacion: boolean;

  servicio_tipo_id;
  estado_id;

  @Column()
  adjunto: string;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  fecha_solicitud: Date;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  fecha_envio_cliente: Date;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  fecha_finalizacion: Date;

  @Index()
  @Column()
  vendedor_id: number;

  /* @Column()
  tipo_cotizacion_id: number;

  @ManyToOne(() => TipoCotizacion)
  @JoinColumn({ name: 'tipo_cotizacion_id', referencedColumnName: 'id' })
  tipocotizacion: TipoCotizacion;
 */
  @Column({
    type: 'varchar',
    nullable: true,
    length: 50,
    name: 'orden_servicio',
  })
  orden_servicio: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
    name: 'orden_servicio_adjunto',
  })
  orden_servicio_adjunto: string;

  @Column({
    type: 'tinyint',
  })
  plazo: number;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 50,
    name: 'motivo',
  })
  motivo;

  @Column({
    type: 'tinyint',
  })
  tipo_perito: number;
  @Column({
    type: 'tinyint',
  })
  perito_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  perito_costo: number;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
    name: 'datos_adicionales',
  })
  datos_adicionales: string;

  @Column()
  desglose_id: number;

  /*  @ManyToOne(() => DesgloseCotizacion)
  @JoinColumn({ name: 'desglose_id', referencedColumnName: 'id' })
  desglose: DesgloseCotizacion; */
}
