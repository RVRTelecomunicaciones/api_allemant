import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('co_requisito')
export class Requisito extends SharedEntity {
  @Column({ type: 'varchar', nullable: false, length: 100, name: 'nombre' })
  nombre: string;

  /*@ManyToMany(() => Servicio, (servicio) => servicio.requisitos)
  servicios: Servicio[];*/
}
