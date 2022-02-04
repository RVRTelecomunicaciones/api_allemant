import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { TipoDocumento } from '@app/modules/tipo-documentos/entities/tipo-documento.entity';
import { Max } from 'class-validator';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';

@Entity('co_involucrado_natural')
@Unique('nro_documento', ['nro_documento'])
export class InvolucradoNatural extends SharedEntity {
  @Column({ type: 'varchar', nullable: false, length: 50, name: 'paterno' })
  paterno: string;

  @Column({ type: 'varchar', nullable: false, length: 50, name: 'materno' })
  materno: string;

  @Column({ type: 'varchar', nullable: false, length: 50, name: 'nombre' })
  nombre: string;

  @ManyToOne(() => TipoDocumento, (tipoDocumento) => tipoDocumento.involucrados)
  tipoDocumento: TipoDocumento;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 8,
    name: 'nro_documento',
  })
  nro_documento: string;

  @Column({ type: 'varchar', nullable: false, length: 10, name: 'telefono' })
  telefono: string;

  @Column({ type: 'varchar', nullable: false, length: 9, name: 'celular1' })
  celular1: string;

  @Column({ type: 'varchar', nullable: false, length: 9, name: 'celular2' })
  celular2: string;

  @Column({ type: 'varchar', nullable: false, length: 150, name: 'direccion' })
  direccion: string;

  @Column({ type: 'varchar', nullable: false, length: 100, name: 'correo' })
  correo: string;
}
