import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { TipoServicio } from '@app/modules/tipo-servicios/entities/tipo-servicio.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('co_servicio')
export class Servicio extends SharedEntity {
  @Column({ type: 'varchar', nullable: false, length: 50, name: 'nombre' })
  nombre: string;

  /*DONDE VA FK */
  @ManyToOne(() => TipoServicio, (tipoServcio) => tipoServcio.servicios)
  //@JoinColumn({ name: 'tipoServicioId' })
  tipoServicioId: TipoServicio;
}
