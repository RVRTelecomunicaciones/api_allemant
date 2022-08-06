import { Requisito } from '@app/modules/requisitos/entities/requisito.entity';
import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { TipoServicio } from '@app/modules/tipo-servicios/entities/tipo-servicio.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity('co_servicio')
export class Servicio extends SharedEntity {
  @Column({ type: 'varchar', nullable: false, length: 60, name: 'nombre' })
  nombre: string;

  @ManyToOne(() => TipoServicio, (tipoServicio) => tipoServicio.servicios)
  tipoServicio: TipoServicio;

  @ManyToMany(() => Requisito, (requisito) => requisito.servicios)
  @JoinTable({
    name: 'co_requisito_servicio_detalle',
    joinColumn: { name: 'servicioId', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'requisitoId',
      referencedColumnName: 'id',
    },
  })
  requisitos: Requisito[];
}
