import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@fline/sequelize';

export class UserFriend extends Model {}

UserFriend.init(
  {
    isPending: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, modelName: 'user_friends' }
);
