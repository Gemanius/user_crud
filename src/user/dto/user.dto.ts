import { RoleEnum } from '../enum/role.enum';

export class UserDto {
  id: string;
  name: string;
  familyName: string;
  role: RoleEnum;
  email: string;
}
