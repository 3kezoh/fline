import { Service } from '@fline/base';
import { User } from './model';

export class UserService extends Service {
  constructor() {
    super(User);
  }
}
