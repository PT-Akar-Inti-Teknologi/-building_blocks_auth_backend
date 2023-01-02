import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ModulesSeederService } from './module/modules.service';
@Injectable()
export class Seeder implements OnApplicationBootstrap {
  constructor(
    private readonly logger: Logger,
    private readonly modulesSeederService: ModulesSeederService,
  ) {}

  onApplicationBootstrap() {
    this.seed();
  }

  async seed() {
    await this.modules()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding modules...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding modules...');
        Promise.reject(error);
      });
  }

  async modules() {
    return Promise.all(this.modulesSeederService.create())
      .then((module) => {
        this.logger.debug(
          'No. of module created : ' +
            module.filter(
              (nullValueOrCreatedModule) => nullValueOrCreatedModule,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
