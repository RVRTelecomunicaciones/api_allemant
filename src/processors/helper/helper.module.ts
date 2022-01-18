import { Global, Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { EmailService } from './mail/helper.service.email';

const services = [EmailService];

@Global()
@Module({
  imports: [HttpModule],
  providers: services,
  exports: services,
})
export class HelperModule {}
