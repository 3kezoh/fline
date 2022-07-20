import { Service } from '@fline/base';
import { User } from './model';
import { UserFriend } from '@fline/user-friends';

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

  async getUser(id) {
    return this.model.findOne({ where: { id } });
  }
}
