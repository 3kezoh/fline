import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@fline/sequelize';
import { hash, genSalt } from 'bcryptjs';
import { VerifyToken } from '@fline/verify-token';
import { UserFriends } from '@fline/user-friends';

export class User extends Model {
  toJSON() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, createdAt, updatedAt, ...rest } = this.get();
    return rest;
  }
}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    technologies: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        validator(technologies) {
          const validTechnologies = [
            'HTML',
            'CSS',
            'JavaScript',
            'TypeScript',
            'React',
            'Node',
          ];

          const isValid = technologies.every((technology) =>
            validTechnologies.includes(technology)
          );

          if (!isValid) {
            throw new Error('Invalid technologies');
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize, modelName: 'user' }
);

User.hasOne(VerifyToken, { foreignKey: 'userId' });

User.belongsToMany(User, {
  as: 'user',
  foreignKey: 'userId',
  through: UserFriends,
});

User.belongsToMany(User, {
  as: 'friend',
  foreignKey: 'friendId',
  through: UserFriends,
});

/**
 * @description Hash the user password
 * @param {User} user The user with the password to be hashed
 * @returns {Promise<void>}
 */
async function hashPassword(user) {
  const salt = await genSalt();
  user.password = await hash(user.password, salt);
}

User.addHook('beforeCreate', hashPassword);

User.addHook('beforeUpdate', async (user) => {
  if (user.changed('password')) {
    await hashPassword(user);
  }
});
