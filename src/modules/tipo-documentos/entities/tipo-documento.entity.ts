import { InvolucradoNatural } from '@app/modules/involucrado-naturales/entities/involucrado-natural.entity';
import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('co_documento_tipo')
export class TipoDocumento extends SharedEntity {
  @Column({ type: 'varchar', nullable: false, length: 2, name: 'codigo' })
  codigo: string;

  @Column({ type: 'varchar', nullable: false, length: 20, name: 'abreviatura' })
  abreviatura: string;

  @Column({ type: 'varchar', nullable: false, length: 50, name: 'nombre' })
  nombre: string;

  @OneToMany(
    () => InvolucradoNatural,
    (involucrado) => involucrado.tipoDocumento,
  )
  involucrados: InvolucradoNatural[];

  @Column({ type: 'int', nullable: false, name: 'longitud' })
  longitud: number;
}
