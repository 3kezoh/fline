import { Sequelize } from 'sequelize';
import { sequelize } from './sequelize';

describe('sequelize', () => {
  it('should be an instance of Sequelize', () => {
    expect(sequelize).toBeInstanceOf(Sequelize);
  });
});
