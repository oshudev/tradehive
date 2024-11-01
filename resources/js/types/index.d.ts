import { Config } from 'ziggy-js';

type UserRole = 'freelancer' | 'client';

export interface User {
  first_name: string;
  last_name: string;
  role: UserRole;
  email: string;
  avatar: string;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
  ziggy: Config & { location: string };
};
