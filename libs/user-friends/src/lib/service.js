import { Service } from '@fline/base';
import { UserFriend } from './model';

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
        id: userId,
        isVerified: true,
      }, //select friends from user with id = userId && isVerified = true
    });
  }

  /**
   * @description Accept friend request from the user
   * @param {number} userId
   * @param {number} friendId
   * @returns {success: boolean}
   */
  async acceptPendingFriend(userId, friendId) {
    const accepted = await this.model.update(
      { isPending: false },
      {
        where: {
          userId: friendId,
          friendId: userId,
        },
      }
    );

    const accepted2 = await this.model.update(
      { isPending: false },
      {
        where: {
          userId: friendId,
          friendId: userId,
        },
      }
    );
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
    if (alreadyInFriendList) {
      return { success: false };
    }
    const newFriend = await this.model.create({
      where: {
        userId: userId,
        friendId: friendId,
        isPending: true,
        isBlocked: false,
      },
    });
    if (!newFriend) {
      return { success: false };
    }
    await this.model.create({
      where: {
        userId: userId,
        friendId: friendId,
        isPending: false,
        isBlocked: false,
      },
    });
    return { success: true };
  }

  /**
   * @description Remove friend from the user
   * @param {number} userId
   * @param {number} friendId
   * @returns {success: boolean}
   */
  async removeFriend(userId, friendId) {
    const friend = await this.model.findOne({
      where: {
        id: userId,
        isVerified: true,
      },
    });
    if (!friend) {
      return { success: false };
    }
    const newFriend = await this.model.update(
      {
        friends: friend.friends.filter((id) => id !== friendId),
      },
      {
        where: {
          id: userId,
          isVerified: true,
        },
      }
    );
    return newFriend ? { success: true } : { success: false };
  }

  /**
   * @description Block friend from the user
   * @param {number} userId
   * @param {number} friendId
   * @returns {success: boolean}
   */
  async blockFriend(userId, friendId) {
    const blocked = await this.model.update(
      { isBlocked: true },
      {
        where: {
          userId: friendId,
          friendId: userId,
        },
      }
    );

    return blocked ? { success: true } : { success: false };
  }

  /**
   * @description Unblock friend from the user
   * @param {number} userId
   * @param {number} friendId
   * @returns {success: boolean}
   */
  async unblockFriend(userId, friendId) {
    const unblocked = await this.model.update(
      { isBlocked: false },
      {
        where: {
          userId: friendId,
          friendId: userId,
        },
      }
    );

    return unblocked ? { success: true } : { success: false };
  }

  /**
   * @description Get blocked friends of the user
   * @param {number} userId
   * @returns {Promise<User[]|null>}
   */
  async getBlockedFriends(userId) {
    return this.model.findAll({
      attributes: ['friends'],
      where: {
        id: userId,
        isVerified: true,
        isBlocked: true,
      }, //select friends from user with id = userId && isVerified = true && isBlocked = true
    });
  }

  /**
   * @description Get pending friends of the user
   * @param {number} userId
   * @returns {Promise<User[]|null>)
   */
  async getPendingFriends(userId) {
    return this.model.findAll({
      attributes: ['friends'],
      where: {
        id: userId,
        isVerified: true,
        isPending: true,
      }, //select friends from user with id = userId && isVerified = true && isPending = true
    });
  }

  /**
   * @description Get real friends of the user
   * @param {number} userId
   * @returns {Promise<User[]|null>)
   */
  async getRealFriends(userId) {
    return this.model.findAll({
      attributes: ['friends'],
      where: {
        id: userId,
        isVerified: true,
        isPending: false,
        isBlocked: false,
      }, //select friends from user with id = userId && isVerified = true && isPending = false && isBlocked = false
    });
  }
}
