import { UserFriendService } from '@fline/user-friends';

const userFriendService = new UserFriendService();

export async function getFriend(req, res, next) {
  try {
    const friend = await userFriendService.getFriends(req.user.id);

    res.json(friend);
  } catch (error) {
    next(error);
  }
}

export async function addFriend(req, res, next) {
  try {
    const friend = await userFriendService.addFriend(
      req.user.id,
      req.body.friendId
    );

    res.json(friend);
  } catch (error) {
    next(error);
  }
}

export async function blockFriend(req, res, next) {
  try {
    const friend = await userFriendService.blockFriend(
      req.user.id,
      req.body.friendId
    );

    res.json(friend);
  } catch (error) {
    next(error);
  }
}

export async function unblockFriend(req, res, next) {
  try {
    const friend = await userFriendService.unblockFriend(
      req.user.id,
      req.body.friendId
    );

    res.json(friend);
  } catch (error) {
    next(error);
  }
}

export async function acceptPendingFriend(req, res, next) {
  try {
    const friend = await userFriendService.acceptPendingFriend(
      req.user.id,
      req.body.friendId
    );

    res.json(friend);
  } catch (error) {
    next(error);
  }
}

export async function rejectFriend(req, res, next) {
  try {
    const friend = await userFriendService.rejectFriend(
      req.user.id,
      req.body.friendId
    );

    res.json(friend);
  } catch (error) {
    next(error);
  }
}

export async function removeFriend(req, res, next) {
  try {
    const friend = userFriendService.removeFriend(
      req.user.id,
      req.body.friendId
    );

    res.json(friend);
  } catch (error) {
    next(error);
  }
}

export async function getFriendRequests(req, res, next) {
  try {
    const friend = await userFriendService.getFriendRequests(req.user.id);

    res.json(friend);
  } catch (error) {
    next(error);
  }
}

export async function getBlockedFriends(req, res, next) {
  try {
    const friend = await userFriendService.getBlockedFriends(req.user.id);

    res.json(friend);
  } catch (error) {
    next(error);
  }
}

export async function getPendingFriends(req, res, next) {
  try {
    const friend = await userFriendService.getPendingFriends(req.user.id);

    res.json(friend);
  } catch (error) {
    next(error);
  }
}

export async function getRealFriends(req, res, next) {
  try {
    const friend = await userFriendService.getRealFriends(req.user.id);

    res.json(friend);
  } catch (error) {
    next(error);
  }
}
