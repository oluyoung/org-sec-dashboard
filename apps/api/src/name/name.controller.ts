import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class NameController {
  @Get('name')
  getName(): string {
    return 'John Doe';
  }
}
