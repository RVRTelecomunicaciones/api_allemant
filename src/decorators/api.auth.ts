import { API_AUTH_KEY } from '@app/constants/api.auth';
import { applyDecorators, SetMetadata } from '@nestjs/common';

export function ApiAuth() {
  return applyDecorators(SetMetadata(API_AUTH_KEY, true));
}
