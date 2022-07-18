import { Service } from '@fline/base';
import { User } from './model';

export class UserService extends Service {
  constructor() {
    super(User);
  }

  /**
   * @description Find a user by email
   * @param {string} email
   * @returns {Promise<User>}
   */
  async findByEmail(email) {
    return this.model.findOne({ where: { email } });
  }
}
