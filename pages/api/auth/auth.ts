import { hash, compare } from "bcryptjs";

export function hashPassword(password: string) {
  return hash(password, 12);
}

export async function verifyPassword(password:string, hashed:string) {
  return compare(password, hashed)
}