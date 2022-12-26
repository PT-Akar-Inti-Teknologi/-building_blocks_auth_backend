import { Controller, Logger } from '@nestjs/common';
import { InternalService } from './internal.service';

@Controller('api/v1/auth')
export class InternalController {
  constructor(private readonly internalService: InternalService) {}

  logger: Logger = new Logger();
}
