import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@fline/sequelize';
import { randomUUID } from 'crypto';

export class VerifyToken extends Model {
  toJSON() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { value } = this.get();
    return value;
  }
}

VerifyToken.init(
  {
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: randomUUID,
    },
  },
  { sequelize, modelName: 'verify_token' }
);
