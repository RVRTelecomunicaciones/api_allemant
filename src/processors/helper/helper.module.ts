import { Global, Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { EmailService } from './mail/helper.service.email';
import { SendGridModule } from '@anchan828/nest-sendgrid';

/* import { SendGridModule } from '@mehulbaid/nest-sendgrid';
import { ConfigService, ConfigModule } from 'nestjs-config'; */

const services = [EmailService];

@Global()
@Module({
  imports: [
    HttpModule,
    SendGridModule.forRoot({
      apikey:
        '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',
    }),
    /* SendGridModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        apiKey: cfg.get(process.env.SENDGRID_API_KEY),
      }),
      inject: [ConfigService],
    }), */
  ],
  providers: services,
  exports: services,
})
export class HelperModule {}
