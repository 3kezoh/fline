import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@fline/sequelize';

export class UserFriends extends Model {}

UserFriends.init(
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
