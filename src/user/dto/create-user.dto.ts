import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
  name: string;
  token: string;
  bossName: string;
  roles: Role[];
}
