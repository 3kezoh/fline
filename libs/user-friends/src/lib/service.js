import { Service } from '@fline/base';
import { UserFriend } from '@fline/user-friends';

export class UserFriendService extends Service {
  constructor() {
    super(UserFriend);
  }

  /**
   * @description Get Friends of the user
   * @param {number} userId
   * @returns {Promise<User[]|null>}
   */
  async getFriends(userId) {
    return this.model.findAll({
      where: {
        friendId: userId,
      },
    });
  }

  /**
   * @description Accept friend request from the user
   * @param {number} userId
   * @param {number} friendId
   * @returns {success: boolean}
   */
  async acceptPendingFriend(userId, friendId) {
    const accepted = await this.model.update({ isPending: false }, {
      where: {
        userId: userId,
        friendId: friendId,
      },
    });

    const accepted2 = await this.model.update({ isPending: false }, {
      where: {
        userId: friendId,
        friendId: userId,
      },
    });
    return accepted && accepted2 ? { success: true } : { success: false };
  }

  /**
   * @description Reject friend request from the user
   * @param {number} userId
   * @param {number} friendId
   * @returns {success: boolean}
   */
  async rejectFriend(userId, friendId) {
    return this.removeFriend(userId, friendId);
  }

  /**
   * @description Add friend to the user
   * @param {number} userId
   * @param {number} friendId
   * @returns {success: boolean}
   */
  async addFriend(userId, friendId) {
    let alreadyInFriendList = await this.model.findOne({
      where: {
        userId: userId,
        friendId: friendId,
      },
    });

    if (!alreadyInFriendList) {
      this.model.create({
        userId: userId,
        friendId: friendId,
        isPending: true,
        isBlocked: false,
      });

      this.model.create({
        userId: friendId,
        friendId: userId,
        isPending: false,
        isBlocked: false,
      });

      return { success: true };
    }

    return { success: false };
  }

  /**
   * @description Block friend from the user
   * @param {number} userId
   * @param {number} friendId
   * @returns {success: boolean}
   */
  async blockFriend(userId, friendId) {
    const blocked = await this.model.update({ isBlocked: true }, {
      where: {
        userId: friendId,
        friendId: userId,
      },
    });

    return blocked ? { success: true } : { success: false };
  }

  /**
   * @description Unblock friend from the user
   * @param {number} userId
   * @param {number} friendId
   * @returns {success: boolean}
   */
  async unblockFriend(userId, friendId) {
    const unblocked = await this.model.update({ isBlocked: false }, {
      where: {
        userId: friendId,
        friendId: userId,
      },
    });

    return unblocked ? { success: true } : { success: false };
  }

  /**
   * @description Remove friend from the user
   * @param {number} userId
   * @param {number} friendId
   * @returns {success: boolean}
   */
  async removeFriend(userId, friendId) {
    const removeFriend = this.model.destroy({
      where: {
        userId: userId,
        friendId: friendId,
      },
    });

    const removeFriend2 = this.model.destroy({
      where: {
        userId: friendId,
        friendId: userId,
      },
    });
    return removeFriend && removeFriend2 ? { success: true } : { success: false };
  }

  /**
   * @description Get friend requests from the user
   * @param {number} userId
   * @returns {Promise<UserFriend>}
   * @memberof UserFriendService
   * @returns {Promise<UserFriend[]|null>}
   */
  async getFriendRequests(userId) {
    return this.model.findAll({
      where: {
        friendId: userId,
        isPending: true,
      },
    });
  }

  /**
   * @description Get blocked friends from the user
   * @param {number} userId
   * @returns {Promise<UserFriend>}
   */
  async getBlockedFriends(userId) {
    return this.model.findAll({
      where: {
        friendId: userId,
        isBlocked: true,
      },
    });
  }

  /**
   * @description Get pending friends of the user
   * @param {number} userId
   * @returns {Promise<UserFriend>}
   */
  async getPendingFriends(userId) {
    return this.model.findAll({
      where: {
        userId: userId,
        isPending: true,
      },
    });
  }

  /**
   * @description Get real friends of the user
   * @param {number} userId
   * @returns {Promise<UserFriend>}
   */
  async getRealFriends(userId) {
    return this.model.findAll({
      where: {
        userId: userId,
        isPending: false,
        isBlocked: false,
      },
    });
  }
}
