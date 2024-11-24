import { Config } from 'ziggy-js';

type UserRole = 'freelancer' | 'client';
type ProjectStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';
type BudgetType = 'fixed' | 'hourly';

export interface User {
  first_name: string;
  last_name: string;
  role: UserRole;
  email: string;
  avatar: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: ProjectStatus;
  type: BudgetType;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
  ziggy: Config & { location: string };
};
