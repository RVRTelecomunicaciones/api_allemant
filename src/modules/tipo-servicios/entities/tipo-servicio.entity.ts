import { Servicio } from '@app/modules/servicios/entities/servicio.entity';
import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('co_servicio_tipo')
export class TipoServicio extends SharedEntity {
  @Column({ type: 'varchar', nullable: false, length: 50, name: 'nombre' })
  nombre: string;

  @OneToMany(() => Servicio, (servicio) => servicio.tipoServicio)
  servicios: Servicio[];
}
