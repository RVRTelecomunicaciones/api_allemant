import { ClasificacionInvolucrado } from '@app/modules/clasificacion-involucrados/entities/clasificacion-involucrado.entity';
import { SectorInvolucrado } from '@app/modules/sector-involucrados/entities/sector-involucrado.entity';
import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { TipoDocumento } from '@app/modules/tipo-documentos/entities/tipo-documento.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';

@Entity('co_involucrado_juridico')
@Unique('nro_documento', ['nro_documento'])
export class InvolucradoJuridico extends SharedEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    length: 150,
    name: 'razon_social',
  })
  razon_social: string;

  @ManyToOne(() => TipoDocumento, (tipoDocumento) => tipoDocumento.involucrados)
  tipoDocumento: TipoDocumento;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 11,
    name: 'nro_documento',
  })
  nro_documento: string;

  @Column({ type: 'varchar', nullable: false, length: 10, name: 'telefono' })
  telefono: string;

  @Column({ type: 'varchar', nullable: false, length: 150, name: 'direccion' })
  direccion: string;

  @Column({ type: 'varchar', nullable: false, length: 100, name: 'correo' })
  correo: string;

  @ManyToOne(
    () => SectorInvolucrado,
    (sectorInvolucrado) => sectorInvolucrado.involucradosSec,
  )
  sector: SectorInvolucrado;

  @ManyToOne(
    () => ClasificacionInvolucrado,
    (clasificacionInvolucrado) => clasificacionInvolucrado.involucradosClas,
  )
  clasificacion: ClasificacionInvolucrado;
}
