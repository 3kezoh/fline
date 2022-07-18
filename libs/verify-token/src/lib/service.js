import { Service } from '@fline/base';
import { VerifyToken } from './model';

export class VerifyTokenService extends Service {
  constructor() {
    super(VerifyToken);
  }

  /**
   * Find a token by its value
   * @param {string} value The token value
   * @returns {Promise<VerifyToken>}
   */
  async findByValue(value) {
    return this.model.findOne({ where: { value } });
  }
}
