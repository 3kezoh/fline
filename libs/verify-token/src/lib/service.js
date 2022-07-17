import { Service } from '@fline/base';
import { VerifyToken } from './model';

export class VerifyTokenService extends Service {
  constructor() {
    super(VerifyToken);
  }

  async findByValue(value) {
    return this.model.findOne({ where: { value } });
  }
}
