import { Service } from '@fline/base';
import { ResetToken } from './model';

export class ResetTokenService extends Service {
  constructor() {
    super(ResetToken);
  }

  /**
   * Find a token by its value
   * @param {string} value The token value
   * @returns {Promise<ResetToken>}
   */
  async findByValue(value) {
    return this.model.findOne({ where: { value } });
  }
}
