export type Role = "admin" | "teacher" | "student";

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
  teacherId?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  teacherId: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
}