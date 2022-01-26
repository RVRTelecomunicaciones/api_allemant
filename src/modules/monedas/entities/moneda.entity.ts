import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { Column, Entity } from 'typeorm';

@Entity('co_moneda')
export class Moneda extends SharedEntity {
  @Column({ type: 'varchar', nullable: false, length: 3, name: 'codigo' })
  codigo: string;

  @Column({ type: 'varchar', nullable: false, length: 10, name: 'simbolo' })
  simbolo: string;

  @Column({ type: 'varchar', nullable: false, length: 25, name: 'nombre' })
  nombre: string;
}
