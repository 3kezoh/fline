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

  /**
   * @description Get Friends of the user
   * @param {number} userId
   * @returns {Promise<User[]|null>}
   */
  async getFriends(userId) {
    return this.model.findAll({
      include: [UserFriend],
      where: {
        id: userId,
      },
    });
  }

  /**
   * @description Add friend to the user
   * @param {number} userId
   * @param {number} friendId
   * @returns {Promise<User>}
   */
  async addFriend(userId, friendId) {
    const user = await this.model.findByPk(userId);
    const friend = await this.model.findByPk(friendId);
    if (!user || !friend) {
      throw new Error('User not found');
    }
    UserFriend.create({
      userId: user.id,
      friendId: friend.id,
      isPending: false,
      isBlocked: false,
    });
    UserFriend.create({
      userId: friend.id,
      friendId: user.id,
      isPending: true,
      isBlocked: false,
    });
    return friend;
  }
}
