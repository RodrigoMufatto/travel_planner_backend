import { SignUpDto } from '../../dto/auth.dto';
import { User } from '@prisma/client';

export abstract class AuthRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract createUser(data: SignUpDto, hashedPassword: string): Promise<User>;
}
