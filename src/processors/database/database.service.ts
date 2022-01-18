import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

export const databaseProvider = [
  TypeOrmModule.forRootAsync({
    imports: [
      ConfigModule.load(
        path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'),
        {
          modifyConfigName: (name) => name.replace('.config', ''),
        },
      ),
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
    ],
  }),
];
