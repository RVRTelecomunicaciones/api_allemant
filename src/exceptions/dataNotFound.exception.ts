import { NotFoundException } from '@nestjs/common';

class DataNotFoundException extends NotFoundException {
  constructor(byId: number) {
    super(`El codigo ${byId} no se establecio`);
  }
}

export default DataNotFoundException;
