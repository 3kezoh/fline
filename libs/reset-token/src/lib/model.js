import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@fline/sequelize';
import { randomUUID } from 'crypto';
import * as dayjs from 'dayjs';

export class ResetToken extends Model {
  toJSON() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { value } = this.get();
    return value;
  }
}

ResetToken.init(
  {
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: randomUUID,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => dayjs().add(1, 'day').toDate(),
    },
  },
  { sequelize, modelName: 'reset_token' }
);
