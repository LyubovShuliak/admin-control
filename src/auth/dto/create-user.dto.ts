import { Role } from '../enums/role.enum';

export class CreateUserDto {
  userName: string;
  boss: string;
  role: Role.Boss | Role.User;
  password: string;
}
