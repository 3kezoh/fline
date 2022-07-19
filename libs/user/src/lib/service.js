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

  /**
   * @description Get Friends of the user
   * @param {number} userId
   * @returns {Promise<User[]|null>}
   */
  async getFriends(userId) {
    return this.model.findAll({
      attributes: ['friends'],
      where: {
        id: userId,
        isVerified: true,
      }, //select friends from user with id = userId && isVerified = true
    });
  }
}
