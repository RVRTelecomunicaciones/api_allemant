import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { UsersModule } from './modules/users/users.module';
import { HelperModule } from './processors/helper/helper.module';
import { CotizacionModule } from './modules/cotizacion/cotizacion.module';
import { AreasModule } from './modules/areas/areas.module';
import { TipoServiciosModule } from './modules/tipo-servicios/tipo-servicios.module';
import { TipoCotizacionesModule } from './modules/tipo-cotizaciones/tipo-cotizaciones.module';
import { EstadoCotizacionesModule } from './modules/estado-cotizaciones/estado-cotizaciones.module';
import { DesglosesModule } from './modules/desgloses/desgloses.module';
import { MonedasModule } from './modules/monedas/monedas.module';
import { EstadoCoordinacionesModule } from './modules/estado-coordinaciones/estado-coordinaciones.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, '**/!(*.d).config.{ts,js}'), {
      modifyConfigName: (name) => name.replace('.config', ''),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: config.get('database.type'),
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        logging: config.get('database.logging'),
        /*         charset: 'utf8mb4_general_ci',
        characterSet: 'utf8mb4', */
        synchronize: true, // 同步数据库
        timezone: '-05:00', // 东八区
        cache: {
          duration: 60000, // 1分钟的缓存
        },
        extra: {
          poolMax: 32,
          poolMin: 16,
          queueTimeout: 60000,
          pollPingInterval: 60, // 每隔60秒连接
          pollTimeout: 60, // 连接有效60秒
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    TokensModule,
    HelperModule,
    CotizacionModule,
    AreasModule,
    TipoServiciosModule,
    TipoCotizacionesModule,
    EstadoCotizacionesModule,
    DesglosesModule,
    MonedasModule,
    EstadoCoordinacionesModule,
  ],
  exports: [TypeOrmModule],

  controllers: [],
  providers: [],
})
export class AppModule {}
