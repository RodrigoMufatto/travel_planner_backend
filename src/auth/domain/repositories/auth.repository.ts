import { User } from '@prisma/client';
import { SignUpRepositoryInputInterface } from './auth.repository.interface';

export abstract class AuthRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract createUser(
    data: SignUpRepositoryInputInterface,
    hashedPassword: string,
  ): Promise<User>;
}
