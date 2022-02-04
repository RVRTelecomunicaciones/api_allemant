import { InvolucradoJuridico } from '@app/modules/involucrado-juridicos/entities/involucrado-juridico.entity';
import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('co_involucrado_clasificacion')
export class ClasificacionInvolucrado extends SharedEntity {
  @Column({ type: 'varchar', nullable: false, length: 50, name: 'nombre' })
  nombre: string;

  @OneToMany(
    () => InvolucradoJuridico,
    (involucrado) => involucrado.clasificacion,
  )
  involucradosClas: InvolucradoJuridico[];
}
